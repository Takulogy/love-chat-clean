import React, { useEffect, useState } from 'react';
import PDFReport from './components/PDFReport';

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

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
        setReply(data.text);
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
    <div className="flex flex-col items-center h-screen bg-gray-100 relative pb-24">
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <img src="/character_normal.png" alt="キャラ" className="w-44 h-44 rounded-full object-cover" />
      </div>

      <div className="mt-60 w-full max-w-xl flex-1 overflow-y-auto flex flex-col gap-2 p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-2xl text-base whitespace-pre-wrap ${
              msg.role === 'user' ? 'self-end bg-green-200' : 'self-start bg-white border border-gray-300'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="self-start bg-white border border-gray-300 p-3 rounded-2xl">考え中だよん…</div>}
      </div>

      <div className="fixed bottom-0 w-full max-w-xl bg-gray-100 flex justify-center p-4 gap-2">
        <input
          type="text"
          value={input}
          placeholder="相談してみてね♥"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 text-base rounded-lg border border-gray-300"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition"
        >
          送信
        </button>
      </div>

      {reply && (
        <div className="mt-4">
          <PDFReport analysisText={reply} />
        </div>
      )}
    </div>
  );
};

export default ChatUI;
