import React, { useEffect, useState } from 'react';

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 診断結果を読み込み、OpenAI API経由で分析開始
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
          body: JSON.stringify({ prompt })
        });

        const data = await res.json();
        if (data && data.text) {
          setMessages([{ sender: 'bot', text: data.text }]);
        } else {
          setMessages([{ sender: 'bot', text: '分析に失敗しました。' }]);
        }
      } catch (err) {
        setMessages([{ sender: 'bot', text: 'サーバーエラーが発生しました。' }]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>AI相談チャット</h2>
      {loading && <p>診断結果を分析中です...</p>}
      {messages.map((msg, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <strong>{msg.sender === 'bot' ? '診断AI：' : 'あなた：'}</strong>
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatUI;
import React, { useState } from 'react';
import './ChatUI.css';
import PDFReport from './components/PDFReport';

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

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
        setReply(data.text); // PDF生成用に保存
      } else {
        setReply('エラーが発生しました。');
      }
    } catch (error) {
      console.error(error);
      setReply('通信エラーが発生しました。');
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
