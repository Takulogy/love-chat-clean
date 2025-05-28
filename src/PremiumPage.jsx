import { useEffect } from 'react';

const PremiumPage = () => {
  useEffect(() => {
    localStorage.setItem('paid', 'true'); // 状態を保存
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎉 プレミア診断にようこそ！</h1>
      <p>より深い診断や、限定会話がここから可能になります。</p>
    </div>
  );
};

export default PremiumPage;
