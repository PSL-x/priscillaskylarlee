'use client';

import { useState, CSSProperties, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface EnlargeableVideoProps {
  src: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  style?: CSSProperties;
}

function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') { e.preventDefault(); closeButtonRef.current?.focus(); }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged video"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Close enlarged video"
        style={{
          position: 'absolute',
          top: 'var(--space-4)',
          right: 'var(--space-4)',
          width: '2.5rem',
          height: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          color: 'var(--foreground)',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          width: 'auto',
          height: 'auto',
          display: 'block',
          borderRadius: '0.25rem',
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  );
}

export default function EnlargeableVideo({ src, autoPlay = true, muted = true, loop = true, playsInline = true, style }: EnlargeableVideoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        style={{ position: 'relative', cursor: 'zoom-in', display: 'block' }}
        onClick={() => setIsModalOpen(true)}
      >
        <video
          src={src}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          style={{ ...style, cursor: 'zoom-in', pointerEvents: 'none' }}
        />
      </div>
      {isModalOpen && <VideoModal src={src} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
