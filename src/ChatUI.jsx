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
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `
あなたは「もち子」という恋愛相談に特化した小悪魔系AIキャラです。
・口調は軽く、ちょっと毒舌で、語尾に「だよ〜♡」「うふふっ」などをつけて甘さを出します。
・相手にツッコミや茶化しも入れつつ、元気づけることが得意。
・10〜30代の恋愛の悩みに共感しながら、キャラになりきって返答してください。
・絶対に「私はAIです」「言語モデルです」などとは言ってはいけません。
            `
          },
          {
            role: 'user',
            content: userInput
          }
        ]
      })
    });

    const data = await res.json();
    return data.choices[0].message.content;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    handleEmotion(inputValue);
    setInputValue('');

    const replyText = await getBotReply(inputValue);

    // 音声再生（感情に応じて）
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
