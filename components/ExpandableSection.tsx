'use client';

import { useState } from 'react';

interface ExpandableSectionProps {
  children: React.ReactNode;
}

export default function ExpandableSection({ children }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleToggle = () => {
    if (!isExpanded) {
      // Opening - enable animation
      setShouldAnimate(true);
      setIsExpanded(true);
    } else {
      // Closing - use faster animation
      setShouldAnimate(true);
      setIsExpanded(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          transition: shouldAnimate ? (isExpanded ? 'grid-template-rows 0.4s ease-out' : 'grid-template-rows 0.3s ease-out') : 'none'
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: isExpanded ? 'var(--space-4)' : '0' }}>
            {children}
          </div>
        </div>
      </div>
      <button
        onClick={handleToggle}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: 'var(--text-sm)',
          color: 'var(--muted)',
          backgroundColor: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          transition: 'color 0.2s, opacity 0.2s',
          fontFamily: 'inherit',
          opacity: 0.8
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--foreground)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--muted)';
          e.currentTarget.style.opacity = '0.8';
        }}
      >
        {isExpanded ? '− less details' : '+ more details'}
      </button>
    </div>
  );
}
