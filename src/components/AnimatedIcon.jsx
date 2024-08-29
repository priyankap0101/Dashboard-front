// AnimatedStarIcon.js
import React from 'react';

const AnimatedStarIcon = () => (
  <div className="relative flex items-center justify-center w-full h-full">
    <svg
      className="w-24 h-24 text-yellow-400 animate-spin-slow transition-transform duration-500 ease-in-out transform hover:scale-110"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#facc15', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          <feBlend in="SourceGraphic" in2="glow" mode="screen" />
        </filter>
      </defs>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3l2.09 6.26L21 10.27l-5 4.73L17.18 21 12 17.27 6.82 21 8 15l-5-4.73 6.91-1.01L12 3z"
        stroke="url(#grad1)"
        filter="url(#glow)"
      />
    </svg>
    <style jsx>{`
      .animate-spin-slow {
        animation: spin 4s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default AnimatedStarIcon;
