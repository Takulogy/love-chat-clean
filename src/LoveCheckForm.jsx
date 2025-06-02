// LoveCheckForm.jsx
import React, { useState } from 'react';
import './LoveCheckForm.css';

const LoveCheckForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const questions = [
    {
      text: 'あなたの性格を一言で表すと？',
      options: ['冷静', '自由奔放', '優しい', '情熱的', '論理的', '面白い']
    },
    // 必要に応じて他の質問を追加
  ];

  const handleOptionSelect = (option) => {
    const newSelections = [...selectedOptions];
    newSelections[currentQuestion] = option;
    setSelectedOptions(newSelections);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert('診断完了！');
    }
  };

  const getCirclePositionStyle = (index, total) => {
    const angle = (360 / total) * index;
    const radius = 150;
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);
    return {
      top: `calc(50% + ${y}px - 50px)`,
      left: `calc(50% + ${x}px - 50px)`
    };
  };

  return (
    <div className="circle-wrapper">
      <div className="center-circle">
        {questions[currentQuestion].text}
      </div>
      {questions[currentQuestion].options.map((option, index) => (
        <div
          key={index}
          className={`option-circle ${selectedOptions[currentQuestion] === option ? 'selected' : ''}`}
          style={getCirclePositionStyle(index, questions[currentQuestion].options.length)}
          onClick={() => handleOptionSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default LoveCheckForm;
