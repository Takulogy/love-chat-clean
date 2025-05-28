import React, { useState } from 'react';
import './ChatUI.css';

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [characterEmotion, setCharacterEmotion] = useState('normal');

  const emotionToVoice = {
    normal: '001_No.7（ノーマル）_うふふ…そっかぁ….wav',
    happy: '001_No.7（ノーマル）_うれしい!.wav',
    sad: '001_No.7（ノーマル）_ひどいよ.wav',
    angry: '001_No.7（ノーマル）_ぷんぷん.wav'
  };

  const getBotReply = async (userInput) => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput })
      });

      if (!res.ok) {
        console.error('API error:', res.status);
        return 'うまく返答できなかったよ〜♡';
      }

      const data = await res.json();
      return data.reply || 'うまく返答できなかったよ〜♡';
    } catch (err) {
      console.error('Fetch failed:', err);
      return 'ネットワークエラーだよ〜♡';
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    handleEmotion(inputValue);
    setInputValue('');

    const replyText = await getBotReply(inputValue);

    const voiceFile = emotionToVoice[characterEmotion];
    if (voiceFile) {
      const audio = new Audio(`/voice/${voiceFile}`);
      audio.play();
    }

    setMessages(prev => [...prev, { text: replyText, sender: 'bot' }]);
  };

  const handleEmotion = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('解決しなかった')) {
      setCharacterEmotion('sad');
    } else if (lower.includes('解決した')) {
      setCharacterEmotion('happy');
    } else if (
      lower.includes('悩') ||
      lower.includes('困') ||
      lower.includes('どうしよう') ||
      lower.includes('なんで') ||
      lower.includes('?')
    ) {
      setCharacterEmotion('normal');
    } else {
      setCharacterEmotion('angry');
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="character-area">
        <img
          src={`/character_${characterEmotion}.png`}
          alt="キャラクター"
          className="character-img"
        />
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="メッセージを入力..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSend}>送信</button>
      </div>
    </div>
  );
};

export default ChatUI;
