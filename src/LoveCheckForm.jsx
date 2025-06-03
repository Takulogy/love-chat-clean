import React, { useState } from 'react';

const questions = [
  {
    question: "あなたの性格を一言で表すと？",
    options: ["冷静", "自由奔放", "優しい", "情熱的", "論理的", "面白い"]
  },
  {
    question: "理想のデートは？",
    options: ["映画館", "レストラン", "公園散歩", "テーマパーク", "美術館", "カフェ"]
  },
  {
    question: "恋人に求めるものは？",
    options: ["優しさ", "ユーモア", "知性", "誠実さ", "積極性", "安定感"]
  }
];

const LoveCheckForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isGathering, setIsGathering] = useState(false);
  const [fadeClass, setFadeClass] = useState('opacity-100');

  const handleSelect = (index) => {
    if (isGathering) return;

    setSelected(index);
    setIsGathering(true);

    const newAnswers = [...answers, questions[currentQuestion].options[index]];

    setTimeout(() => setFadeClass('opacity-0'), 1500);

    setTimeout(() => {
      setAnswers(newAnswers);
      setSelected(null);
      setIsGathering(false);

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setFadeClass('opacity-100');
      } else {
        setIsCompleted(true);
      }
    }, 1800);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelected(null);
    setIsCompleted(false);
    setIsGathering(false);
    setFadeClass('opacity-100');
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="text-center p-10 bg-blue-50 rounded-3xl shadow-lg">
          <h2 className="text-2xl text-teal-600 font-bold mb-5">診断完了！</h2>
          <p className="mb-5">あなたの回答:</p>
          <ul className="list-none p-0">
            {answers.map((answer, index) => (
              <li key={index} className="my-3 p-3 bg-teal-400 text-white rounded-lg">
                {questions[index].question} → {answer}
              </li>
            ))}
          </ul>
          <button
            onClick={resetQuiz}
            className="mt-5 px-5 py-3 bg-teal-600 text-white rounded-lg text-base hover:bg-teal-700 transition"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    );
  }

  const current = questions[currentQuestion];
  const positions = [
    'top-0 left-1/2 transform -translate-x-1/2',
    'top-1/4 right-0 transform -translate-y-1/2',
    'bottom-1/4 right-0 transform translate-y-1/2',
    'bottom-0 left-1/2 transform -translate-x-1/2',
    'bottom-1/4 left-0 transform translate-y-1/2',
    'top-1/4 left-0 transform -translate-y-1/2',
  ];

  return (
    <div className="relative w-full h-screen flex justify-center items-center font-sans">
      <div className={`relative w-96 h-96 transition-opacity duration-300 ${fadeClass}`}>
        <div className="absolute w-48 h-48 bg-teal-600 rounded-full flex justify-center items-center text-white font-bold text-base z-10 text-center p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div>
            <div className="text-xs mb-2 opacity-80">
              質問 {currentQuestion + 1} / {questions.length}
            </div>
            <div className="font-bold">{current.question}</div>
          </div>
        </div>

        {current.options.map((option, index) => (
          <div
            key={index}
            className={`absolute w-20 h-20 bg-teal-300 rounded-full flex justify-center items-center font-bold text-black cursor-pointer transition-all duration-300 text-center text-xs p-1
              ${positions[index]} 
              ${selected === index ? 'bg-blue-500 text-white scale-110' : 'hover:bg-blue-500 hover:text-white hover:scale-110'} 
              ${isGathering && selected === index ? 'animate-gather' : ''}`}
            onClick={() => handleSelect(index)}
          >
            {option}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gather {
          0% {
            opacity: 1;
          }
          100% {
            top: calc(50% - 2.5rem) !important;
            left: calc(50% - 2.5rem) !important;
            right: auto !important;
            bottom: auto !important;
            transform: scale(0);
            opacity: 0;
          }
        }

        .animate-gather {
          animation: gather 1.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoveCheckForm;
