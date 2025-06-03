import React, { useState } from "react";
import "./LoveCheckForm.css";
import RadarChartComponent from './components/RadarChartComponent';


const questions = [
  {
    text: "質問1.会う頻度",
    options: ["毎日", "週3", "週1", "月1", "気分", "未定"],
    scores: [
      { passion: 2 }, { passion: 1 }, { cool: 1 }, { cool: 2 }, { independent: 1 }, { independent: 2 }
    ]
  },
  {
    text: "質問2.返信速度",
    options: ["即レス", "30分", "1時間", "半日", "1日", "気が向けば"],
    scores: [
      { empathy: 2 }, { empathy: 1 }, { cool: 1 }, { cool: 2 }, { independent: 1 }, { independent: 2 }
    ]
  },
  {
    text: "質問3.主導権",
    options: ["全部任せたい", "多めに任せたい", "半々", "自分が多め", "自分が全部", "その時次第"],
    scores: [
      { dependent: 2 }, { dependent: 1 }, {}, { independent: 1 }, { independent: 2 }, { cool: 1 }
    ]
  },
  {
    text: "質問4.ケンカの後",
    options: ["即謝る", "すぐ仲直り", "距離とる", "しばらく無視", "記憶消す", "そもそも怒らない"],
    scores: [
      { empathy: 2 }, { empathy: 1 }, { cool: 1 }, { cool: 2 }, { passion: 1 }, { independent: 1 }
    ]
  },
  {
    text: "質問5.理想のデート",
    options: ["遊園地", "カフェ", "自然", "旅行", "家", "映画"],
    scores: [
      { passion: 2 }, { empathy: 1 }, { cool: 1 }, { passion: 1 }, { independent: 1 }, { cool: 1 }
    ]
  },
  {
    text: "質問6.愛情表現",
    options: ["言葉が重要", "行動で示す", "表情で伝える", "恥ずかしい", "いらない", "時々する"],
    scores: [
      { empathy: 2 }, { passion: 2 }, { empathy: 1 }, { cool: 1 }, { independent: 2 }, { cool: 1 }
    ]
  },
  {
    text: "質問7.浮気の境界線",
    options: ["連絡でアウト", "食事もダメ", "手を繋いだら", "キスから", "体の関係", "定義しない"],
    scores: [
      { dependent: 2 }, { dependent: 1 }, { empathy: 1 }, { passion: 1 }, { cool: 2 }, { independent: 2 }
    ]
  },
  {
    text: "質問8.連絡頻度",
    options: ["1日10回", "5回", "2回", "1回", "気分", "気づいたら"],
    scores: [
      { empathy: 2 }, { empathy: 1 }, {}, { cool: 1 }, { independent: 1 }, { independent: 2 }
    ]
  },
  {
    text: "質問9.価値観の違い",
    options: ["合わせる", "話し合う", "我慢する", "無視する", "すぐ別れる", "放置"],
    scores: [
      { empathy: 2 }, { cool: 1 }, { dependent: 1 }, { cool: 2 }, { independent: 2 }, { independent: 1 }
    ]
  },
  {
    text: "質問10.嫉妬した時",
    options: ["我慢", "言う", "泣く", "怒る", "無視", "黙る"],
    scores: [
      { cool: 2 }, { empathy: 2 }, { dependent: 1 }, { passion: 2 }, { cool: 1 }, { independent: 1 }
    ]
  }
];

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
          {/* レーダーチャートを表示 */}
          <RadarChartComponent score={score} />

          <button onClick={resetQuiz}>もう一度診断する</button>
        </div>
      )}
    </div>
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