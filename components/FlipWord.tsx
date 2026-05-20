'use client';

import { useEffect, useRef } from 'react';

const words = [
  'Triathlete.',
  'Post-Hardcore Music Enthusiast.',
  'Realist.',
  'Coffee Nerd.',
  'Wanderer.',
  'Amateur Surfer.',
  'Nutrition-curious.',
  'Sports Psychology Intrigued.',
  'Ex-Dodgeballer.',
  'Existentialist.',
  'Aspiring Bikepacker.',
];

const COPIES = 5;
const REEL = Array.from({ length: COPIES }, () => words).flat();
const ITEM_HEIGHT = 1.4; // em — must match .slot-machine-word height in CSS
const SPIN_WORDS = 18;

export default function FlipWord() {
  const reelRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef({
    index: words.length, // start in second copy
    spinning: false,
  });

  const setPosition = (index: number, animated: boolean) => {
    const el = reelRef.current;
    if (!el) return;
    el.style.transition = animated
      ? `transform 1.8s cubic-bezier(0.1, 0.6, 0.15, 1)`
      : 'none';
    el.style.transform = `translateY(calc(-${index} * ${ITEM_HEIGHT}em))`;
  };

  const spin = () => {
    const state = stateRef.current;
    if (state.spinning) return;
    state.spinning = true;

    const target = state.index + SPIN_WORDS;
    setPosition(target, true);

    setTimeout(() => {
      const snapped = target - words.length * 2;
      state.index = snapped;
      setPosition(snapped, false);
      state.spinning = false;
    }, 1850);
  };

  useEffect(() => {
    const state = stateRef.current;
    state.index = words.length;
    state.spinning = false;
    setPosition(state.index, false);

    const interval = setInterval(spin, 5000);

    return () => {
      clearInterval(interval);
      state.spinning = false;
    };
  }, []);

  return (
    <span
      className="slot-machine-container"
      aria-live="polite"
      aria-atomic="true"
      onClick={spin}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && spin()}
      style={{ cursor: 'pointer' }}
    >
      <span ref={reelRef} className="slot-machine-reel">
        {REEL.map((word, i) => (
          <span key={i} className="slot-machine-word">
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
