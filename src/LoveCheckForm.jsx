import React, { useState } from "react";
import "./LoveCheckForm.css";
import RadarChartComponent from './components/RadarChartComponent';

// キャラクター画像のインポート
import passionImg from './assets/character-images/passion.png';
import coolImg from './assets/character-images/cool.png';
import independentImg from './assets/character-images/independent.png';
import dependentImg from './assets/character-images/dependent.png';
import empathyImg from './assets/character-images/empathy.png';

const questions = [
  {
    text: "質問1.会う頻度",
    options: ["毎日", "週3回", "週1回", "月1回", "気分次第", "未定"],
    scores: [
      { passion: 2 }, { passion: 1 }, { cool: 1 }, { cool: 2 }, { independent: 1 }, { independent: 2 }
    ]
  },
  {
    text: "質問2.連絡の返信速度",
    options: ["即レス", "30分以内", "1時間以内", "半日以内", "1日以内", "気が向いた時"],
    scores: [
      { empathy: 2 }, { empathy: 1 }, { cool: 1 }, { cool: 2 }, { independent: 1 }, { independent: 2 }
    ]
  },
  {
    text: "質問3.関係の主導権",
    options: ["相手に任せる", "相手主導", "対等", "自分主導", "自分が決める", "状況次第"],
    scores: [
      { dependent: 2 }, { dependent: 1 }, {}, { independent: 1 }, { independent: 2 }, { cool: 1 }
    ]
  },
  {
    text: "質問4.記念日の重要度",
    options: ["絶対忘れない", "覚えてる", "普通", "あまり気にしない", "重要視しない", "そもそも苦手"],
    scores: [
      { empathy: 2 }, { empathy: 1 }, { cool: 1 }, { cool: 2 }, { independent: 1 }, { independent: 2 }
    ]
  },
  {
    text: "質問5.理想のデート",
    options: ["テーマパーク", "カフェ巡り", "自然散策", "旅行", "お家時間", "映画鑑賞"],
    scores: [
      { passion: 2 }, { empathy: 1 }, { cool: 1 }, { passion: 1 }, { independent: 1 }, { cool: 1 }
    ]
  },
  {
    text: "質問6.愛情表現の方法",
    options: ["言葉で伝える", "行動で示す", "表情・態度", "プレゼント", "スキンシップ", "特に表現しない"],
    scores: [
      { empathy: 2 }, { passion: 2 }, { empathy: 1 }, { dependent: 1 }, { passion: 1 }, { independent: 2 }
    ]
  },
  {
    text: "質問7.束縛について",
    options: ["お互い束縛したい", "程よく束縛", "最低限のルール", "自由が大事", "完全に自由", "束縛の概念がない"],
    scores: [
      { dependent: 2 }, { dependent: 1 }, { empathy: 1 }, { independent: 1 }, { independent: 2 }, { cool: 2 }
    ]
  },
  {
    text: "質問8.相手の友達との関係",
    options: ["仲良くしたい", "適度に関わる", "挨拶程度", "特に関わらない", "会いたくない", "どうでもいい"],
    scores: [
      { empathy: 2 }, { empathy: 1 }, { cool: 1 }, { independent: 1 }, { dependent: 1 }, { independent: 2 }
    ]
  },
  {
    text: "質問9.価値観の違いが生じた時",
    options: ["相手に合わせる", "話し合って解決", "時間をかけて理解", "お互い尊重", "自分を貫く", "気にしない"],
    scores: [
      { dependent: 2 }, { empathy: 2 }, { empathy: 1 }, { cool: 1 }, { independent: 2 }, { independent: 1 }
    ]
  },
  {
    text: "質問10.将来への考え方",
    options: ["一緒に計画したい", "話し合いたい", "なんとなく考える", "自然に任せる", "今を大切にする", "特に考えない"],
    scores: [
      { dependent: 2 }, { empathy: 2 }, { cool: 1 }, { independent: 1 }, { passion: 1 }, { independent: 2 }
    ]
  }
];

// 画像マッピング
const typeImages = {
  passion: passionImg,
  cool: coolImg,
  independent: independentImg,
  dependent: dependentImg,
  empathy: empathyImg
};

const LoveCheckForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isGathering, setIsGathering] = useState(false);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [score, setScore] = useState({
    passion: 0,
    cool: 0,
    independent: 0,
    dependent: 0,
    empathy: 0
  });

  const handleSelect = (index) => {
    setSelected(index);
    setIsGathering(true);

    const selectedScore = questions[currentQuestion].scores[index];
    const newScore = { ...score };

    for (const key in selectedScore) {
      newScore[key] += selectedScore[key];
    }

    const newAnswers = [...answers, questions[currentQuestion].options[index]];

    setTimeout(() => {
      setFadeClass("fade-out");
    }, 1500);

    setTimeout(() => {
      setAnswers(newAnswers);
      setScore(newScore);
      setSelected(null);
      setIsGathering(false);

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setFadeClass("fade-in");
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
    setFadeClass("fade-in");
    setScore({
      passion: 0,
      cool: 0,
      independent: 0,
      dependent: 0,
      empathy: 0
    });
  };

  return (
    <div className="form-container">
      {!isCompleted ? (
        <>
          <div className="center-circle">
            {questions[currentQuestion].text}
          </div>
          <div className={`options-container ${fadeClass}`}>
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`option-circle option-${index} ${
                  selected === index ? "selected" : ""
                } ${isGathering && selected !== index ? "gathering" : ""}`}
                onClick={() => handleSelect(index)}
              >
                {option}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="result">
          <h2>診断完了！</h2>
          <p>あなたのタイプは：「{getPersonalityType(score)}」です</p>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '40px',
            margin: '20px 0',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1', maxWidth: '400px', minWidth: '300px' }}>
              <RadarChartComponent score={score} />
            </div>
            
            <div style={{ 
              flex: '0 0 200px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <img 
                src={typeImages[getPersonalityTypeKey(score)]} 
                alt={getPersonalityType(score)}
                style={{ 
                  width: '200px', 
                  height: '200px', 
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '4px solid #5b9aa0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          </div>
          
          <button 
            onClick={resetQuiz}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#5b9aa0',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4a8389'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#5b9aa0'}
          >
            もう一度診断する
          </button>
        </div>
      )}
    </div>
  );
};

// スコアからタイプキーを判定
const getPersonalityTypeKey = (score) => {
  return Object.keys(score).reduce((a, b) =>
    score[a] > score[b] ? a : b
  );
};

// スコアからタイプを判定
const getPersonalityType = (score) => {
  const maxKey = Object.keys(score).reduce((a, b) =>
    score[a] > score[b] ? a : b
  );

  const typeMap = {
    passion: "ジェットコースター姫",
    cool: "氷の貴公子",
    independent: "風まかせ猫",
    dependent: "抱っこハムスター",
    empathy: "涙もろいイルカ"
  };

  return typeMap[maxKey] || "ミステリービースト";
};

export default LoveCheckForm;