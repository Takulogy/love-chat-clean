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

    const handleSelect = (index) => {
        setSelected(index);
        const newAnswers = [...answers, questions[currentQuestion].options[index]];
        
        setTimeout(() => {
            setAnswers(newAnswers);
            setSelected(null);
            
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setIsCompleted(true);
            }
        }, 300);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setSelected(null);
        setIsCompleted(false);
    };

    if (isCompleted) {
        return (
            <div className="form-container">
                <div className="completion-container">
                    <h2 className="completion-title">診断完了！</h2>
                    <p className="completion-text">あなたの回答:</p>
                    <ul className="answers-list">
                        {answers.map((answer, index) => (
                            <li key={index} className="answer-item">
                                {questions[index].question} → {answer}
                            </li>
                        ))}
                    </ul>
                    <button 
                        onClick={resetQuiz}
                        className="reset-button"
                    >
                        もう一度診断する
                    </button>
                </div>
            </div>
        );
    }

    const current = questions[currentQuestion];

    return (
        <div className="form-container">
            <div className="options-container">
                <div className="center-circle">
                    <div>
                        <div className="question-number">
                            質問 {currentQuestion + 1} / {questions.length}
                        </div>
                        <div className="question-text">{current.question}</div>
                    </div>
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
        </div>
    );
};

export default LoveCheckForm;