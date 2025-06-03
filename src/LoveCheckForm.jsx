import React, { useState } from 'react';
import RadarChart from './RadarChart';

const questions = [
  { question: '理想のデート', options: ['海', '山', '街', '家'] },
  { question: '恋人の第一印象', options: ['笑顔', '服', '声', '雰囲気'] },
  { question: '一緒にしたいこと', options: ['旅行', '料理', '映画', 'スポーツ'] },
  { question: '連絡頻度', options: ['毎日', '週2', '気まま', 'ほぼ無'] },
  { question: 'デートの予算', options: ['高め', '中間', '安め', '割勘'] },
  { question: '嫉妬深さ', options: ['強', '中', '弱', '皆無'] },
  { question: 'ケンカ後の対応', options: ['話す', '時間', '謝る', '無視'] },
  { question: '価値観重視', options: ['趣味', 'お金', '家族', '性格'] },
  { question: '恋のスピード', options: ['即', '普通', '遅', '様子'] },
  { question: '将来観', options: ['結婚', '同棲', '自由', '未定'] }
];

const scoresMap = [
  [3, 1, 2, 4], // 質問1のスコア（オプション順）
  [2, 3, 4, 1],
  [4, 1, 2, 3],
  [1, 3, 2, 4],
  [2, 4, 1, 3],
  [3, 2, 4, 1],
  [4, 2, 1, 3],
  [2, 1, 3, 4],
  [3, 4, 1, 2],
  [1, 2, 4, 3],
];

const LoveCheckForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isGathering, setIsGathering] = useState(false);
  const [fadeClass, setFadeClass] = useState('fade-in');

  const handleSelect = (index) => {
    setSelected(index);
    setIsGathering(true);

    const newAnswers = [...answers, index];

    setTimeout(() => {
      setFadeClass('fade-out');
    }, 1500);

    setTimeout(() => {
      setAnswers(newAnswers);
      setSelected(null);
      setIsGathering(false);

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setFadeClass('fade-in');
      } else {
        setIsCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelected(null);
    setIsCompleted(false);
    setIsGathering(false);
    setFadeClass('fade-in');
  };

  const calculateScore = () => {
    const totalScore = [0, 0, 0, 0, 0]; // 5次元のスコア
    answers.forEach((ans, i) => {
      const weight = scoresMap[i][ans];
      totalScore[i % 5] += weight;
    });
    return totalScore;
  };

  const score = calculateScore();

  return (
    <div className="form-container">
      {!isCompleted ? (
        <>
          <div className="center-circle">{questions[currentQuestion].question}</div>
          <div className={`options-container ${fadeClass}`}>
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`option-circle option-${index} ${
                  selected === index ? 'selected' : ''
                } ${isGathering && selected !== index ? 'gathering' : ''}`}
                onClick={() => handleSelect(index)}
              >
                {option}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="result-container">
          <h2>診断完了！</h2>
          <RadarChart score={score} />
          <button onClick={resetQuiz}>もう一度診断する</button>
        </div>
      )}
    </div>
  );
};

export default LoveCheckForm;
