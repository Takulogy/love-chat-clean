import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = ({ result, topMatches }) => {
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowResult(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dataToSave = {
      result,
      topMatches,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('freeAnswers', JSON.stringify(dataToSave));
  }, [result, topMatches]);

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
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
    <div className="p-8 text-center">
      {!showResult ? (
        <div className="text-xl animate-pulse text-gray-600">
          🔍 診断結果を解析中...
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">診断結果</h2>
          <p className="mb-4">あなたに合いそうなタイプ（上位3位）</p>
          <ul className="list-none p-0 mb-6">
            {topMatches?.map((match, index) => (
              <li key={index} className="mb-2">・{match} な人</li>
            ))}
          </ul>
          <p className="mb-2">もっと具体的な診断や相談をしたい方はこちら👇</p>
          <button
            onClick={handleCheckout}
            className="mt-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            プレミアム診断へ進む
          </button>
        </>
      )}
    </div>
  );
};

export default ResultPage;
