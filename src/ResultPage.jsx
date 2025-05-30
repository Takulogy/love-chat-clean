import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const answers = location.state?.answers;

  if (!answers) {
    return <p>診断データがありません。トップページに戻ってください。</p>;
  }

  // 仮の診断ロジック（あとでAIやスコア連携に差し替え可能）
  const summary = `あなたは「${answers.type}」な人を選ぶとよいでしょう。`;
  const topMatches = [
    `${answers.type} な人`,
    `${answers.personality} な人`,
    `${answers.value} を大事にする人`
  ];

  const handleGoPremium = () => {
    navigate('/premium');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
      <h1>診断結果</h1>
      <p style={{ fontSize: '18px', margin: '1rem 0' }}>{summary}</p>

      <h2>あなたに合いそうなタイプ（上位3位）</h2>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: '16px' }}>
        {topMatches.map((match, index) => (
          <li key={index}>・{match}</li>
        ))}
      </ul>

      <div style={{ marginTop: '2rem' }}>
        <p>もっと具体的な診断や相談をしたい方はこちら👇</p>
        <button
          onClick={handleGoPremium}
          style={{
            marginTop: '1rem',
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          プレミアム診断へ進む
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
