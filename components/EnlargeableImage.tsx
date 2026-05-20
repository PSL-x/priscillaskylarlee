'use client';

import { useState, CSSProperties } from 'react';
import ImageModal from './ImageModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface EnlargeableImageProps {
  src: string;
  alt: string;
  style?: CSSProperties;
  className?: string;
  revealDelay?: number;
}

export default function EnlargeableImage({ src, alt, style, className, revealDelay = 0 }: EnlargeableImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useScrollReveal(revealDelay);

  return (
    <>
      <img
        ref={ref as React.RefObject<HTMLImageElement>}
        src={src}
        alt={alt}
        style={{
          ...style,
          cursor: 'zoom-in',
        }}
        className={className}
        onClick={() => setIsModalOpen(true)}
        draggable="false"
      />
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
