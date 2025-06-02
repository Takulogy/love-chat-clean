import React, { useState } from 'react';
import './LoveCheckForm.css';
import characterImage from './assets/character_normal.png';

const questions = [
  {
    question: '理想のデートは？',
    options: ['映画', '遊園地', 'カフェ', 'おうちデート'],
  },
  {
    question: '相手に求めることは？',
    options: ['安心感', '刺激', '優しさ', '共通の趣味'],
  },
  // ...他の質問
];

const LoveCheckForm = ({ onFinish }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleSelect = (option) => {
    const nextAnswers = [...answers, option];
    if (current + 1 < questions.length) {
      setAnswers(nextAnswers);
      setCurrent(current + 1);
    } else {
      onFinish(nextAnswers); // 回答完了時
    }
  };

  return (
    <div className="love-check-container">
      <div className="character-area">
        <img src={characterImage} alt="Character" className="floating-character" />
        <div className="question-text">{questions[current].question}</div>
        <div className="circle-options">
          {questions[current].options.map((option, index) => (
            <button
              key={index}
              className={`option-button option-${index}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoveCheckForm;
