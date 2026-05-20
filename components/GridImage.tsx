'use client';

import { useRef } from 'react';
import EnlargeableImage from './EnlargeableImage';

interface GridImageProps {
  src: string;
  alt: string;
}

export default function GridImage({ src, alt }: GridImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const getSiblingIndex = () => {
    const el = wrapperRef.current;
    if (!el) return 0;
    const siblings = el.parentElement?.querySelectorAll('[data-grid-image]');
    return siblings ? Array.from(siblings).indexOf(el) : 0;
  };

  return (
    <div ref={wrapperRef} data-grid-image={src}>
      <EnlargeableImage
        src={src}
        alt={alt}
        className="image-grid-item"
        revealDelay={getSiblingIndex() * 150}
      />
    </div>
  );
}
