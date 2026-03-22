import React from 'react';

interface Props {
  currentIndex: number;
  total: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (index: number) => void;
}

export default function PlayerControls({
  currentIndex, total, isPlaying, onPlay, onPause, onNext, onPrev, onSeek
}: Props) {
  const progress = total > 1 ? currentIndex / (total - 1) : 1;

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '12px 24px 20px',
      background: 'linear-gradient(to top, rgba(10,10,11,0.95) 0%, transparent 100%)',
    }}>
      {/* Progress bar */}
      <div
        style={{
          height: 3,
          background: '#1e1e22',
          borderRadius: 2,
          marginBottom: 12,
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          const index = Math.round(pct * (total - 1));
          onSeek(Math.max(0, Math.min(total - 1, index)));
        }}
      >
        <div style={{
          height: '100%',
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          borderRadius: 2,
          transition: 'width 0.3s ease',
        }} />
        {/* Step markers */}
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: `${total > 1 ? (i / (total - 1)) * 100 : 100}%`,
              transform: 'translate(-50%, -50%)',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: i <= currentIndex ? '#8b5cf6' : '#333',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          style={btnStyle(currentIndex === 0)}
        >
          ←
        </button>

        <button
          onClick={isPlaying ? onPause : onPlay}
          style={{
            ...btnStyle(false),
            width: 40,
            height: 40,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            fontSize: 16,
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button
          onClick={onNext}
          disabled={currentIndex === total - 1}
          style={btnStyle(currentIndex === total - 1)}
        >
          →
        </button>
      </div>
    </div>
  );
}

function btnStyle(disabled: boolean): React.CSSProperties {
  return {
    width: 36,
    height: 36,
    borderRadius: 8,
    border: '1px solid #2a2a2e',
    background: '#111113',
    color: disabled ? '#333' : '#888',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s',
  };
}
