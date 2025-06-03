import React, { useState } from 'react';
import RadarChart from './components/RadarChart';

const questions = [
  { question: '理想のデート', options: ['海', '山', '街', '家', '公園', '温泉'] },
  { question: '第一印象重視', options: ['顔', '服', '声', '雰囲気', '話し方', '清潔感'] },
  { question: '休日の過ごし方', options: ['映画', '読書', '運動', '買物', '寝る', '料理'] },
  { question: '返信頻度', options: ['即', '1h', '半日', '1日', '気分', '無視'] },
  { question: 'デート代負担', options: ['全額', '多め', '半分', '少し', 'なし', '交互'] },
  { question: '嫉妬度合い', options: ['激高', '高', '中', '低', '無', 'ゼロ'] },
  { question: '喧嘩の対応', options: ['話す', '謝る', '黙る', '離れる', '泣く', 'スルー'] },
  { question: '価値観重視', options: ['趣味', '金銭', '家族', '愛情', '自立', '性格'] },
  { question: '恋の始まり', options: ['一目', '徐々', '告白', '流れ', '勘', '勢い'] },
  { question: '将来観', options: ['結婚', '同棲', '別居', '自由', '未定', '遠距'] }
];

const scoresMap = [
  [3, 1, 2, 4, 2, 1],
  [2, 3, 4, 1, 2, 1],
  [4, 1, 2, 3, 2, 1],
  [1, 3, 2, 4, 2, 1],
  [2, 4, 1, 3, 1, 2],
  [3, 2, 4, 1, 2, 1],
  [4, 2, 1, 3, 2, 1],
  [2, 1, 3, 4, 2, 1],
  [3, 4, 1, 2, 1, 2],
  [1, 2, 4, 3, 2, 1]
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
    const totalScore = [0, 0, 0, 0, 0];
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
