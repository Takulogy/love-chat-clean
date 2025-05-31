import React from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// Stripe公開鍵（.envにVITE_STRIPE_PUBLIC_KEYを設定すること！）
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ResultPage = () => {
  const location = useLocation();
  const answers = location.state?.answers;

  if (!answers) {
    return <p>診断データがありません。トップページに戻ってください。</p>;
  }

  const summary = `あなたは「${answers.type}」な人を選ぶとよいでしょう。`;
  const topMatches = [
    `${answers.type} な人`,
    `${answers.personality} な人`,
    `${answers.value ?? "愛情"} を大事にする人` // undefined対策で ?? を使用
  ];

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });
      const data = await res.json();
      console.log("StripeセッションID:", data.id);

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('決済中にエラーが発生しました。');
    }
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
          onClick={handleCheckout}
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
