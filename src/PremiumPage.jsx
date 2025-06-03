import { useEffect } from 'react';

const PremiumPage = () => {
  useEffect(() => {
    localStorage.setItem('paid', 'true');
  }, []);

  return (
    <div className="p-8 text-center font-sans">
      <h1 className="text-2xl font-bold mb-4">🎉 プレミア診断にようこそ！</h1>
      <p className="text-lg">より深い診断や、限定会話がここから可能になります。</p>
    </div>
  );
};

export default PremiumPage;
