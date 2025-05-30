import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoveCheckForm.css';

const questions = [
  { id: 'age', text: '年齢層は？', options: ['10代', '20代', '30代', '40代'] },
  { id: 'type', text: '好みのタイプは？', options: ['キレイ系', 'かわいい系', 'ツンデレ系', 'はきはき系'] },
  { id: 'height', text: '自分の身長は？', options: ['140cm以下', '150cm以下', '160cm以下', '170cm以上'] },
  { id: 'romance', text: '恋愛観について', options: ['ずっと好きと言いたい', 'たまに言えばOK', '言わなくても通じる', '合わなくても自由でいい'] },
  { id: 'location', text: '居住地は？', options: ['都会派', '郊外派', '地方出身', '海外在住'] },
  { id: 'personality', text: '性格タイプは？', options: ['内向的', '外向的', '優柔不断', 'ストレートに言う'] },
  { id: 'job', text: '職業は？', options: ['学生', '営業職', '事務/IT', 'フリーランス'] },
  { id: 'subject', text: '好きだった科目は？', options: ['国語', '数学', '体育', '美術'] },
  { id: 'distance', text: '恋人との距離感は？', options: ['毎日連絡したい', '数日に1回でいい', '会えればOK', 'たまに放っておいて'] },
  { id: 'value', text: '恋愛に求めるものは？', options: ['安心感', 'ドキドキ', '自由', '成長できる関係'] }
];

const LoveCheckForm = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleSelect = (option) => {
    const question = questions[current];
    setAnswers({ ...answers, [question.id]: option });

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      navigate('/result', { state: { answers } });
    }
  };

  const q = questions[current];

  return (
    <div className="love-check-container">
      <div className="character-wrapper">
        <img src="/character_normal.png" alt="キャラ" className="floating-character" />
      </div>

      <div className="question-box">
        <h2>質問 {current + 1} / {questions.length}</h2>
        <p>{q.text}</p>
        <div className="option-grid">
          {q.options.map((opt, idx) => (
            <button key={idx} className="option-button" onClick={() => handleSelect(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoveCheckForm;
