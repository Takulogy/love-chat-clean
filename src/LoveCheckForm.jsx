import React, { useState } from 'react';
import './LoveCheckForm.css';

const LoveCheckForm = () => {
  const [selected, setSelected] = useState(null);

  const question = "あなたの性格を一言で表すと？";
  const options = [
    "優しい",
    "情熱的",
    "論理的",
    "面白い",
    "冷静",
    "自由奔放"
  ];

  const handleSelect = (index) => {
    setSelected(index);
  };

  return (
    <div className="circle-container">
      <div className="center-circle">
        <p className="question-text">{question}</p>
      </div>
      {options.map((option, index) => {
        const angle = (index / options.length) * 2 * Math.PI;
        const x = 140 * Math.cos(angle);
        const y = 140 * Math.sin(angle);
        return (
          <div
            key={index}
            className={`option-circle ${selected === index ? 'selected' : ''}`}
            style={{
              transform: `translate(${x}px, ${y}px)`
            }}
            onClick={() => handleSelect(index)}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};

export default LoveCheckForm;
