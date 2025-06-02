
import React, { useState } from 'react';
import './LoveCheckForm.css';

const questions = [
  {
    question: "あなたの性格を一言で表すと？",
    options: ["冷静", "自由奔放", "優しい", "情熱的", "論理的", "面白い"]
  },
  // 他の質問もここに追加可能
];

const LoveCheckForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    setSelected(index);
    const newAnswers = [...answers, questions[currentQuestion].options[index]];
    setTimeout(() => {
      setAnswers(newAnswers);
      setSelected(null);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert("診断完了！");
        // 遷移処理など
      }
    }, 300);
  };

  const current = questions[currentQuestion];

  return (
    <div className="form-container">
      <div className="center-circle">
        <div className="question-text">{current.question}</div>
      </div>
      {current.options.map((option, index) => (
        <div
          key={index}
          className={`option-circle option-${index} ${selected === index ? 'selected' : ''}`}
          onClick={() => handleSelect(index)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default LoveCheckForm;
