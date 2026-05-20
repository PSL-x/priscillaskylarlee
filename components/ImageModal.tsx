'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    // Focus the close button on mount
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Trap focus within modal — only the close button is focusable
      if (e.key === 'Tab') {
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
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
      aria-label={`Enlarged image: ${alt}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 0,
        animation: 'fadeIn 0.2s ease-out',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'none'
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Close enlarged image"
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

      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: '80vw',
          maxHeight: '80vh',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          touchAction: 'none',
          display: 'block',
          backgroundColor: 'transparent'
        }}
        onClick={(e) => e.stopPropagation()}
        draggable="false"
      />
      {alt && (
        <span style={{
          position: 'absolute',
          bottom: 'var(--space-4)',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--muted)',
          fontSize: 'var(--text-sm)',
          textAlign: 'center',
          maxWidth: '90vw',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 'var(--space-1) var(--space-2)',
          borderRadius: '0.25rem',
          display: 'block'
        }}
        onClick={(e) => e.stopPropagation()}
        >
          {alt}
        </span>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 48rem) {
          div {
            padding: var(--space-1) !important;
          }
          img {
            max-width: 98vw !important;
            max-height: 80vh !important;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
