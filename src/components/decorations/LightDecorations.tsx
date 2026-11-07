import React from 'react';

// Silk-smooth organic upward arch mask separating storefront photo and content
// Matches the exact upward dome cradle in reference mockup
export function CurvedWaveMask() {
  return (
    <div className="absolute -bottom-0.5 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
      <svg
        viewBox="0 0 500 45"
        preserveAspectRatio="none"
        className="relative block w-full h-8 sm:h-12"
      >
        <path
          d="M0,45 C140,4 360,4 500,45 L500,45 L0,45 Z"
          fill="#FAF7F2"
        />
      </svg>
    </div>
  );
}

// Line-art Coffee Cup for default cafe logo
export function CoffeeCupIcon({ className = "w-8 h-8 text-[#5C3A21]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 7C22.5 9 20.5 11 22 13"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M26 6C27.5 8 25.5 10 27 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M12 17H36V28C36 34.6 30.6 40 24 40C17.4 40 12 34.6 12 28V17Z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 21H38C40.8 21 43 23.2 43 26C43 28.8 40.8 31 38 31H36"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M8 44C13 46 35 46 40 44"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
