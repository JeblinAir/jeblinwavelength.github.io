
import React from 'react';
import { DIAL_RADIUS, DIAL_CENTER_X, DIAL_CENTER_Y } from '../constants';
import { GamePhase } from '../types';

interface DialProps {
  targetAngle: number;
  phase: GamePhase;
}

const Dial: React.FC<DialProps> = ({ targetAngle, phase }) => {
  const isHidden = phase === GamePhase.GUESSING;

  // Function to create a semi-circle slice path
  const getWedgePath = (startAngle: number, endAngle: number, radius: number) => {
    const startRad = (startAngle - 180) * (Math.PI / 180);
    const endRad = (endAngle - 180) * (Math.PI / 180);

    const x1 = DIAL_CENTER_X + radius * Math.cos(startRad);
    const y1 = DIAL_CENTER_Y + radius * Math.sin(startRad);
    const x2 = DIAL_CENTER_X + radius * Math.cos(endRad);
    const y2 = DIAL_CENTER_Y + radius * Math.sin(endRad);

    return `M ${DIAL_CENTER_X} ${DIAL_CENTER_Y} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="relative flex justify-center items-center w-full max-w-2xl mx-auto aspect-[2/1] bg-slate-800/50 rounded-t-full border-b-4 border-slate-700 overflow-hidden shadow-2xl">
      <svg
        viewBox="0 0 500 250"
        className="w-full h-full drop-shadow-lg transition-all duration-700 ease-in-out"
        style={{ filter: isHidden ? 'grayscale(0.5) brightness(0.7)' : 'none' }}
      >
        {/* Background Dial Base */}
        <path
          d={`M 50 250 A 200 200 0 0 1 450 250 L 50 250 Z`}
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Target Zones (Only visible when not hidden) */}
        {!isHidden && (
          <g className="transition-opacity duration-300">
             {/* Large background wedge to cover the arcs */}
            <path
              d={getWedgePath(targetAngle - 12, targetAngle + 12, DIAL_RADIUS)}
              fill="#f87171" // 2 Points
            />
            <path
              d={getWedgePath(targetAngle - 7, targetAngle + 7, DIAL_RADIUS)}
              fill="#fbbf24" // 3 Points
            />
            <path
              d={getWedgePath(targetAngle - 2, targetAngle + 2, DIAL_RADIUS)}
              fill="#4ade80" // 4 Points
            />
          </g>
        )}

        {/* Dial Ticks */}
        {Array.from({ length: 19 }).map((_, i) => {
          const angle = i * 10;
          const rad = (angle - 180) * (Math.PI / 180);
          const x1 = DIAL_CENTER_X + (DIAL_RADIUS - 10) * Math.cos(rad);
          const y1 = DIAL_CENTER_Y + (DIAL_RADIUS - 10) * Math.sin(rad);
          const x2 = DIAL_CENTER_X + DIAL_RADIUS * Math.cos(rad);
          const y2 = DIAL_CENTER_Y + DIAL_RADIUS * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#64748b"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      
      {/* Hide Overlay for guessing phase */}
      <div 
        className={`absolute inset-0 bg-slate-900 transition-transform duration-1000 origin-bottom ${
          phase === GamePhase.GUESSING ? 'translate-y-0 opacity-40' : 'translate-y-full opacity-0'
        }`}
      />
    </div>
  );
};

export default Dial;
