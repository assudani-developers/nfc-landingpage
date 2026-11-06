import React from 'react';

// Delicate botanical leaves seen in the bottom left corner of reference image
export function BotanicalLeavesCorner({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Main curved branch */}
      <path
        d="M20 190C35 150 70 120 120 95C145 82 170 70 185 50"
        stroke="#8C775D"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      
      {/* Secondary branch */}
      <path
        d="M60 145C80 125 105 110 135 105"
        stroke="#8C775D"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* Leaf 1 - Bottom Left */}
      <path
        d="M25 185C20 160 38 145 55 152C70 160 55 185 25 185Z"
        fill="#A6947B"
        opacity="0.5"
      />
      <path
        d="M25 185C38 168 50 160 55 152"
        stroke="#70604C"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* Leaf 2 */}
      <path
        d="M48 160C40 135 60 120 78 128C92 136 78 160 48 160Z"
        fill="#B8A78F"
        opacity="0.55"
      />

      {/* Leaf 3 */}
      <path
        d="M75 135C68 110 90 95 108 102C122 110 105 135 75 135Z"
        fill="#9C886E"
        opacity="0.5"
      />

      {/* Leaf 4 - Mid */}
      <path
        d="M98 112C105 88 130 92 135 110C138 125 115 132 98 112Z"
        fill="#AFA087"
        opacity="0.48"
      />

      {/* Leaf 5 - Upper */}
      <path
        d="M125 90C130 65 155 70 160 88C162 102 142 108 125 90Z"
        fill="#8E7B62"
        opacity="0.45"
      />

      {/* Leaf 6 - Tip */}
      <path
        d="M155 68C165 48 185 52 188 68C190 80 172 85 155 68Z"
        fill="#A6947B"
        opacity="0.4"
      />
    </svg>
  );
}

// Organic gentle curved wave bottom cut for the storefront banner
export function CurvedWaveMask() {
  return (
    <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
      <svg
        viewBox="0 0 500 45"
        preserveAspectRatio="none"
        className="relative block w-full h-9 sm:h-11"
      >
        <path
          d="M0,0 C150,42 350,42 500,0 L500,45 L0,45 Z"
          fill="#FAF7F2"
        />
      </svg>
    </div>
  );
}

// Top Coffee Cup SVG icon for default cafe logo
export function CoffeeCupIcon({ className = "w-8 h-8 text-[#5C3A21]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Steam lines */}
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
      {/* Cup body */}
      <path
        d="M12 17H36V28C36 34.6 30.6 40 24 40C17.4 40 12 34.6 12 28V17Z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Handle */}
      <path
        d="M36 21H38C40.8 21 43 23.2 43 26C43 28.8 40.8 31 38 31H36"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Saucer */}
      <path
        d="M8 44C13 46 35 46 40 44"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
