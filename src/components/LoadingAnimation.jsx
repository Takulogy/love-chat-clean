// src/components/LoadingAnimation.jsx
import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-xl text-gray-600">
      <div className="w-16 h-16 rounded-full bg-pink-400 animate-ping mb-5"></div>
      <p>診断結果を解析中です...</p>
    </div>
  );
};

export default LoadingAnimation;
