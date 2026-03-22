import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Recording } from '../types';
import PlayerControls from './PlayerControls';
import CursorOverlay from './CursorOverlay';
import ClickHighlight from './ClickHighlight';

export interface DemoPlayerProps {
  data: Recording;
  /** Fill the parent container (default). Set explicit px/% values to constrain. */
  width?: string | number;
  height?: string | number;
  /** Start playing automatically */
  autoPlay?: boolean;
  /** Called when the last step finishes in autoplay */
  onComplete?: () => void;
}

type Phase = 'before' | 'zoom' | 'after';

const T_BEFORE = 1200;
const T_ZOOM   = 700;
const T_AFTER  = 1800;

export default function DemoPlayer({
  data,
  width = '100%',
  height = '100%',
  autoPlay = false,
  onComplete,
}: DemoPlayerProps) {
  const { steps, title } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase]               = useState<Phase>('before');
  const [isPlaying, setIsPlaying]       = useState(autoPlay);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step      = steps[currentIndex];
  const total     = steps.length;
  const hasBefore = !!step?.screenshotBefore;

  const clearTimer = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };

  const goToStep = useCallback((index: number) => {
    if (index < 0 || index >= total) return;
    clearTimer();
    setCurrentIndex(index);
    setPhase('before');
  }, [total]);

  const next = useCallback(() => {
    if (currentIndex < total - 1) {
      goToStep(currentIndex + 1);
    } else {
      setIsPlaying(false);
      onComplete?.();
    }
  }, [currentIndex, total, goToStep, onComplete]);

  const prev = useCallback(() => goToStep(currentIndex - 1), [currentIndex, goToStep]);

  // Phase sequencer
  useEffect(() => {
    if (!isPlaying) return clearTimer;

    if (!hasBefore) {
      setPhase('after');
      timerRef.current = setTimeout(next, T_AFTER);
      return clearTimer;
    }

    if (phase === 'before') {
      timerRef.current = setTimeout(() => setPhase('zoom'), T_BEFORE);
    } else if (phase === 'zoom') {
      timerRef.current = setTimeout(() => setPhase('after'), T_ZOOM);
    } else {
      timerRef.current = setTimeout(next, T_AFTER);
    }
    return clearTimer;
  }, [isPlaying, phase, hasBefore, next]);

  // Keyboard controls (only when focused / fullscreen)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if      (e.key === 'ArrowRight') { clearTimer(); next(); }
      else if (e.key === 'ArrowLeft')  { clearTimer(); prev(); }
      else if (e.key === ' ')          { e.preventDefault(); setIsPlaying(p => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (!step) return null;

  const { position, viewport } = step;
  const pctX = (position.x / viewport.width)  * 100;
  const pctY = (position.y / viewport.height) * 100;
  const scale = phase === 'zoom' ? 1.22 : 1;
  const baseSrc        = step.screenshotBefore || step.screenshot;
  const afterSrc       = step.screenshot;
  const showAfterLayer = phase === 'after';

  return (
    <div style={{
      width, height,
      background: '#0a0a0b',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative',
      // Ensure the component respects its container
      minWidth: 0, minHeight: 0,
    }}>

      {/* Title bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(to bottom, rgba(10,10,11,0.9), transparent)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 20, height: 20, borderRadius: 5, flexShrink: 0,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          }} />
          <span style={{
            fontSize: 13, fontWeight: 600, color: '#fff',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 300,
          }}>
            {title}
          </span>
        </div>
        <span style={{ fontSize: 12, color: '#555', flexShrink: 0 }}>
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Content */}
      <div style={{
        flex: 1, minHeight: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '52px 32px 88px',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Browser mockup */}
        <div style={{
          width: '100%', maxWidth: '100%', maxHeight: '100%',
          background: '#1a1a1e', borderRadius: 10, overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          border: '1px solid #2a2a2e',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Dots bar */}
          <div style={{
            height: 32, background: '#141416',
            borderBottom: '1px solid #222',
            display: 'flex', alignItems: 'center',
            padding: '0 10px', gap: 5, flexShrink: 0,
          }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: '#3a3a3a' }} />
            ))}
          </div>

          {/* Screenshot area */}
          <div style={{
            position: 'relative', overflow: 'hidden', flex: 1,
            aspectRatio: `${viewport.width} / ${viewport.height}`,
          }}>
            <motion.div
              key={currentIndex}
              animate={{ scale }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: 'absolute', inset: 0, transformOrigin: `${pctX}% ${pctY}%` }}
            >
              {/* Before layer */}
              {baseSrc ? (
                <img src={baseSrc} alt="" style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              ) : (
                <div style={{
                  position: 'absolute', inset: 0, background: '#1a1a20',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#444', fontSize: 13,
                }}>
                  No screenshot captured
                </div>
              )}

              {/* After layer */}
              {hasBefore && (
                <motion.img
                  src={afterSrc} alt=""
                  animate={{ opacity: showAfterLayer ? 1 : 0 }}
                  transition={{ duration: 0.45, delay: showAfterLayer ? 0.1 : 0 }}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                    display: 'block', opacity: 0,
                  }}
                />
              )}

              <CursorOverlay
                x={position.x} y={position.y}
                viewportWidth={viewport.width} viewportHeight={viewport.height}
              />

              {phase !== 'before' && step.type === 'click' && (
                <ClickHighlight
                  key={currentIndex + '-hl'}
                  x={position.x} y={position.y}
                  viewportWidth={viewport.width} viewportHeight={viewport.height}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Step description pill */}
        <motion.div
          key={currentIndex + '-desc'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          style={{
            position: 'absolute', bottom: 80,
            left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(18,18,22,0.96)',
            border: '1px solid #2a2a2e',
            borderRadius: 8, padding: '7px 14px',
            fontSize: 13, color: '#ccc',
            backdropFilter: 'blur(8px)',
            whiteSpace: 'nowrap', maxWidth: '85%',
            overflow: 'hidden', textOverflow: 'ellipsis',
            pointerEvents: 'none',
          }}
        >
          {step.description}
        </motion.div>
      </div>

      <PlayerControls
        currentIndex={currentIndex} total={total} isPlaying={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => { clearTimer(); setIsPlaying(false); }}
        onNext={() => { clearTimer(); next(); }}
        onPrev={() => { clearTimer(); prev(); }}
        onSeek={(i) => { clearTimer(); goToStep(i); setIsPlaying(false); }}
      />
    </div>
  );
}
