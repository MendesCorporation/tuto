import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  x: number;
  y: number;
  viewportWidth: number;
  viewportHeight: number;
}

export default function CursorOverlay({ x, y, viewportWidth, viewportHeight }: Props) {
  // Convert absolute position to percentage
  const pctX = (x / viewportWidth) * 100;
  const pctY = (y / viewportHeight) * 100;

  return (
    <motion.div
      animate={{
        left: `${pctX}%`,
        top: `${pctY}%`,
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      {/* Cursor SVG */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 2L18 11L11.5 12.5L9 19L4 2Z"
          fill="white"
          stroke="#000"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
