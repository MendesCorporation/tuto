import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  x: number;
  y: number;
  viewportWidth: number;
  viewportHeight: number;
}

export default function ClickHighlight({ x, y, viewportWidth, viewportHeight }: Props) {
  const pctX = (x / viewportWidth) * 100;
  const pctY = (y / viewportHeight) * 100;

  return (
    <div style={{
      position: 'absolute',
      left: `${pctX}%`,
      top: `${pctY}%`,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: 15,
    }}>
      {/* Ripple rings */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3 + i, opacity: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: '2px solid #6366f1',
            top: -10,
            left: -10,
          }}
        />
      ))}
      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#6366f1',
          position: 'absolute',
          top: -5,
          left: -5,
          boxShadow: '0 0 12px rgba(99,102,241,0.8)',
        }}
      />
    </div>
  );
}
