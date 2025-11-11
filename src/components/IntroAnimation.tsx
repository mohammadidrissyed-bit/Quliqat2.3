import React from 'react';
import { Logo } from './Logo';

interface IntroAnimationProps {
  isVisible: boolean;
}

export function IntroAnimation({ isVisible }: IntroAnimationProps): React.ReactNode {
  return (
    <div
      className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center
        transition-opacity duration-1000 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Ripples */}
        <div className="absolute inset-0 animate-intro-ripple border-2 border-cyan-400/50 rounded-full" style={{ animationDelay: '0s' }} />
        <div className="absolute inset-0 animate-intro-ripple border-2 border-violet-500/50 rounded-full" style={{ animationDelay: '0.8s' }} />
        
        {/* Progress Orbit */}
        <div className="absolute inset-[-10px] animate-intro-progress-orbit">
          <div className="w-full h-full border-t-2 border-b-2 border-white/30 rounded-full" />
        </div>

        {/* Pulsing Logo */}
        <div className="animate-intro-logo-pulse">
            <Logo size="xxxxl" />
        </div>
      </div>
    </div>
  );
}