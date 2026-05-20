'use client';

import { useState } from 'react';
import ImageModal from './ImageModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CoverImage({ src, alt }: { src: string; alt: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useScrollReveal();

  return (
    <>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{
          marginBottom: 0,
          borderRadius: '0.25rem',
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'opacity 1.2s ease, transform 1.2s ease',
        }}>
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            cursor: 'zoom-in',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onClick={() => setIsModalOpen(true)}
          draggable="false"
        />
      </div>
      {isModalOpen && (
        <ImageModal
          src={src}
          alt={alt}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
