import React from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <div className="pulse-circle"></div>
      <p>診断結果を解析中です...</p>
    </div>
  );
};

export default LoadingAnimation;
