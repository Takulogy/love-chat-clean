import React, { useState } from 'react';
import './LoveCheckForm.css';

const questions = [
    { question: "あなたの性格を一言で表すと？", options: ["冷静", "自由奔放", "優しい", "情熱的", "論理的", "面白い"] },
    { question: "理想のデートは？", options: ["映画館", "レストラン", "公園散歩", "テーマパーク", "美術館", "カフェ"] },
    { question: "恋人に求めるものは？", options: ["優しさ", "ユーモア", "知性", "誠実さ", "積極性", "安定感"] },
    { question: "あなたの第一印象は？", options: ["真面目", "面白い", "クール", "優しそう", "怖い", "穏やか"] },
    { question: "休日の過ごし方は？", options: ["家でゴロゴロ", "買い物", "旅行", "友人と遊ぶ", "勉強・読書", "スポーツ"] },
    { question: "告白のタイミングは？", options: ["すぐ言う", "1ヶ月後", "3ヶ月後", "1年後", "相手から来るまで待つ", "言わない"] },
    { question: "浮気をどう思う？", options: ["絶対ダメ", "理解できない", "バレなきゃOK", "別れの原因", "許せるかも", "自分もしちゃうかも"] },
    { question: "恋人と喧嘩したら？", options: ["謝る", "黙る", "話し合う", "逃げる", "感情的になる", "冷静になる"] },
    { question: "理想の結婚生活は？", options: ["穏やか", "刺激的", "自由", "支え合う", "仲良し夫婦", "趣味共有"] },
    { question: "あなたの恋愛スタイルは？", options: ["尽くすタイプ", "リードするタイプ", "受け身", "依存する", "自由", "バランス型"] }
];

const LoveCheckForm = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
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
                // 全問完了 → 解析中 → 完了へ
                setIsAnalyzing(true);
                setTimeout(() => {
                    setIsAnalyzing(false);
                    setIsCompleted(true);
                }, 2000);
            }
        }, 300);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setSelected(null);
        setIsCompleted(false);
    };

    if (isAnalyzing) {
        return (
            <div className="form-container">
                <div className="completion-container">
                    <h2 className="completion-title">解析中...</h2>
                    <p className="completion-text">結果を計算しています。少々お待ちください。</p>
                </div>
            </div>
        );
    }

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
                        onClick={() => window.location.href = "/chat"}
                        className="reset-button"
                    >
                        プレミアム診断へ進む
                    </button>
                    <button 
                        onClick={resetQuiz}
                        className="reset-button"
                        style={{ backgroundColor: '#ccc', marginLeft: '10px' }}
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
