import React, { useEffect, useState } from 'react';
import './ChatUI.css';
import PDFReport from './components/PDFReport';

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  // 最初の診断結果（無料）をもとに自動分析
  useEffect(() => {
    const saved = localStorage.getItem('freeAnswers');
    if (!saved) return;

    const parsed = JSON.parse(saved);
    const prompt = `以下は恋愛診断の結果です。この情報をもとに、相性・性格傾向・注意点を含めたアドバイスをください。\n\n診断結果: ${JSON.stringify(parsed)}`;

    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        if (data && data.text) {
          const botMessage = { role: 'assistant', content: data.text };
          setMessages([botMessage]);
          setReply(data.text);
        } else {
          setMessages([{ role: 'assistant', content: '分析に失敗しました。' }]);
        }
      } catch (err) {
        setMessages([{ role: 'assistant', content: 'サーバーエラーが発生しました。' }]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  // ユーザー送信メッセージ処理
  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setLoading(true);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      if (data.text) {
        setMessages([...newMessages, { role: 'assistant', content: data.text }]);
        setReply(data.text); // PDF生成用
      } else {
        setMessages([...newMessages, { role: 'assistant', content: 'エラーが発生しました。' }]);
      }
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', content: '通信エラーが発生しました。' }]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="message assistant">考え中だよん…</div>}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={input}
          placeholder="相談してみてね♥"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>送信</button>
      </div>

      {reply && (
        <div className="pdf-section">
          <PDFReport analysisText={reply} />
        </div>
      )}
    </div>
  );
};

export default ChatUI;