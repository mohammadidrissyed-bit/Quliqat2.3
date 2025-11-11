import React from "react";

type Size = "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "xxxxl";
type Layout = "icon" | "full";

interface LogoProps {
  size?: Size;
  className?: string;
  layout?: Layout;
}

const sizeMap: Record<Size, number> = {
  sm: 24,
  md: 36,
  lg: 60,
  xl: 100,
  xxl: 150,
  xxxl: 200,
  xxxxl: 250,
};

const stars = Array.from({ length: 100 }, (_, i) => ({
  key: `star-${i}`,
  cx: Math.random() * 200,
  cy: Math.random() * 400,
  r: Math.random() * 0.8 + 0.2,
  opacity: Math.random() * 0.5 + 0.5,
}));

export function Logo({ size = "md", className = "", layout = "icon" }: LogoProps) {
  const height = sizeMap[size];
  // Aspect ratio for "QuLiQaT" is roughly 4.5:1, but we calculate it more precisely
  // The 'Q' is 200 units wide, the text starts at 220 and is about 450 units wide. Total ~670. 670/200 = 3.35
  const width = layout === 'full' ? height * 3.35 : height;

  const qPathData = "M100 20 A 80 80 0 1 0 100 180 A 80 80 0 1 0 100 20 M 100 50 A 50 50 0 1 1 100 150 A 50 50 0 1 1 100 50 Z M115 125 L165 175 L175 165 L125 115 Z";

  return (
    <div
      className={className}
      aria-label="QuliQaT logo"
      role="img"
      style={{ width: `${width}px`, height: `${height}px`, display: "inline-flex", alignItems: 'center' }}
    >
      <svg
        viewBox={layout === 'full' ? "0 0 700 200" : "0 0 200 200"}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="cosmic-grad-qul" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="20%" stopColor="#facc15" />
            <stop offset="60%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <clipPath id="qul-clip-path">
            <path d={qPathData} />
          </clipPath>
           {/* DEFS FOR READABLE TEXT */}
          <linearGradient id="readable-text-grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="var(--logo-text-color-start)" />
            <stop offset="100%" stopColor="var(--logo-text-color-end)" />
          </linearGradient>
          <filter id="text-shadow-filter">
              <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#1e293b" floodOpacity="0.2"/>
          </filter>
        </defs>
        
        {/* Q emblem group */}
        <g>
            <g fill="url(#cosmic-grad-qul)">
                <path d={qPathData} />
            </g>
            <g clipPath="url(#qul-clip-path)">
                <g className="stars-drift">
                    {stars.map(s => <circle key={s.key} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity} />)}
                    {stars.map(s => <circle key={`${s.key}-clone`} cx={s.cx} cy={s.cy + 200} r={s.r} fill="white" opacity={s.opacity} />)}
                </g>
            </g>
            <g clipPath="url(#qul-clip-path)">
              <path d="M85 40 L88 35 L91 40 L88 45 Z" fill="white" className="star-flicker" style={{ animationDelay: '0s' }} />
              <path d="M140 55 L143 50 L146 55 L143 60 Z" fill="white" className="star-flicker" style={{ animationDelay: '0.5s' }} />
              <path d="M50 145 L53 140 L56 145 L53 150 Z" fill="white" className="star-flicker" style={{ animationDelay: '1s' }} />
            </g>
        </g>
        
        {/* Conditionally render "uLiQaT" text */}
        {layout === 'full' && (
          <text 
            x="220" 
            y="135" 
            fontFamily="sans-serif"
            fontSize="100"
            fontWeight="bold" 
            letterSpacing="-2"
            fill="url(#readable-text-grad)"
            stroke="var(--logo-stroke-color)"
            strokeWidth="0.5"
            filter="url(#text-shadow-filter)"
          >
            uLiQaT
          </text>
        )}
      </svg>
    </div>
  );
}