import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = ({ result, topMatches }) => {
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);

  // 解析演出：3秒後に結果表示
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 保存処理：localStorage に無料診断結果を保存
  useEffect(() => {
    const dataToSave = {
      result,
      topMatches,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('freeAnswers', JSON.stringify(dataToSave));
  }, [result, topMatches]);

  // Stripeチェックアウトへ遷移
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('決済ページの取得に失敗しました。');
      }
    } catch (error) {
      alert('決済中にエラーが発生しました。');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      {!showResult ? (
        <div style={{ fontSize: '1.5rem', animation: 'fadeIn 1s infinite alternate' }}>
          🔍 診断結果を解析中...
        </div>
      ) : (
        <>
          <h2>診断結果</h2>
          <p>あなたに合いそうなタイプ（上位3位）</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {topMatches?.map((match, index) => (
              <li key={index}>・{match} な人</li>
            ))}
          </ul>
          <p>もっと具体的な診断や相談をしたい方はこちら👇</p>
          <button
            onClick={handleCheckout}
            style={{
              marginTop: '1rem',
              padding: '0.8rem 1.6rem',
              fontSize: '1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            プレミアム診断へ進む
          </button>
        </>
      )}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0.5; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default ResultPage;