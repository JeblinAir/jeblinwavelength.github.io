
import React from 'react';
import { DIAL_CENTER_X, DIAL_CENTER_Y, DIAL_RADIUS } from '../constants';

interface NeedleProps {
  angle: number;
  color?: string;
  isInteractable?: boolean;
}

const Needle: React.FC<NeedleProps> = ({ angle, color = "#ef4444", isInteractable = true }) => {
  // Convert angle (0-180) to rotation
  // 0 is left, 90 is top, 180 is right
  const rotation = angle - 90;

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
      <svg viewBox="0 0 500 250" className="w-full h-full overflow-visible">
        <g 
          style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${DIAL_CENTER_X}px ${DIAL_CENTER_Y}px` }}
          className="transition-transform duration-300 ease-out"
        >
          {/* Needle Body */}
          <line
            x1={DIAL_CENTER_X}
            y1={DIAL_CENTER_Y}
            x2={DIAL_CENTER_X}
            y2={DIAL_CENTER_Y - (DIAL_RADIUS + 20)}
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            className="drop-shadow-sm"
          />
          
          {/* Arrow Tip */}
          <path
            d={`M ${DIAL_CENTER_X - 10} ${DIAL_CENTER_Y - DIAL_RADIUS - 10} L ${DIAL_CENTER_X} ${DIAL_CENTER_Y - DIAL_RADIUS - 30} L ${DIAL_CENTER_X + 10} ${DIAL_CENTER_Y - DIAL_RADIUS - 10} Z`}
            fill={color}
          />

          {/* Center Pin */}
          <circle
            cx={DIAL_CENTER_X}
            cy={DIAL_CENTER_Y}
            r="12"
            fill="#334155"
            stroke={color}
            strokeWidth="3"
          />
          <circle
             cx={DIAL_CENTER_X}
             cy={DIAL_CENTER_Y}
             r="4"
             fill={color}
          />
        </g>
      </svg>
    </div>
  );
};

export default Needle;
