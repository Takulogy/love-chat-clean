import React, { useState } from 'react';
import './LoveCheckForm.css';

const questions = [
  {
    question: "初対面では？",
    options: ["話しかける", "様子を見る", "緊張する", "自然体", "丁寧に", "話さない"]
  },
  {
    question: "恋人には？",
    options: ["甘える", "甘えられ", "対等", "リード", "合わせる", "距離取る"]
  },
  {
    question: "ケンカしたら？",
    options: ["すぐ謝る", "話し合う", "距離置く", "待つ", "怒る", "流す"]
  },
  {
    question: "連絡頻度は？",
    options: ["毎日多く", "1日1回", "必要だけ", "気まぐれ", "会話重視", "任せる"]
  },
  {
    question: "大事なものは？",
    options: ["信頼", "相性", "会話", "価値観", "見た目", "安心感"]
  },
  {
    question: "好きになったら？",
    options: ["即アタック", "徐々に接近", "見守る", "伝える", "待つ", "距離とる"]
  },
  {
    question: "自分と恋人",
    options: ["恋人優先", "バランス", "自分時間", "流れ次第", "考えない", "気分次第"]
  },
  {
    question: "求めることは？",
    options: ["やさしさ", "笑い", "誠実", "行動力", "安心", "刺激"]
  },
  {
    question: "理想の休日は？",
    options: ["家で", "外出", "旅行", "映画", "自由", "友達と"]
  },
  {
    question: "惹かれる所は？",
    options: ["仕草", "声", "笑顔", "考え方", "趣味", "雰囲気"]
  }
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

        const newAnswers = [...answers, questions[currentQuestion].options[index]];

        // gatherアニメーションが終わったあとにfadeOut
        setTimeout(() => {
            setFadeClass('fade-out');
        }, 1500);

        // フェードアウト後に次の質問へ
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

    if (isCompleted) {
        return (
            <div className="form-container">
                <div className="result-box">
                    <h2>診断完了！</h2>
                    <p>あなたの回答:</p>
                    <ul>
                        {answers.map((answer, index) => (
                            <li key={index}>{questions[index].question} → {answer}</li>
                        ))}
                    </ul>
                    <button onClick={resetQuiz}>もう一度診断する</button>
                </div>
            </div>
        );
    }

    const current = questions[currentQuestion];

    return (
        <div className="form-container">
            <div className={`options-container ${fadeClass}`}>
                <div className="center-circle">
                    <div>
                        <div className="question-count">
                            質問 {currentQuestion + 1} / {questions.length}
                        </div>
                        <div>{current.question}</div>
                    </div>
                </div>
                {current.options.map((option, index) => (
                    <div
                        key={index}
                        className={`option-circle option-${index} 
                                                          ${selected === index ? 'selected' : ''} 
                                                          ${isGathering && selected !== index ? 'fade-out' : ''} 
                                                          ${isGathering && selected === index ? 'gathering' : ''}`}
                        onClick={() => !isGathering && handleSelect(index)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoveCheckForm;
