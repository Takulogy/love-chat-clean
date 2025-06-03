import React, { useState } from 'react';
import './LoveCheckForm.css';

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
