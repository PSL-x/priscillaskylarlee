'use client';

import { useState } from 'react';

export default function StatusWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleToggle = () => {
    setShouldAnimate(true);
    setIsExpanded(e => !e);
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '2rem',
        right: '2rem',
        paddingTop: 'var(--space-4)',
        backgroundColor: 'var(--background)'
      }}
    >
      <div
        className="wavy-line-container"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', cursor: 'pointer' }}
      >
        <svg
          width="100%"
          height="6"
          viewBox="0 0 100 6"
          preserveAspectRatio="none"
          style={{ opacity: 0.3 }}
          className="wavy-line"
          aria-hidden="true"
        >
          <path
            d="M0,3 Q2.5,0 5,3 T10,3 T15,3 T20,3 T25,3 T30,3 T35,3 T40,3 T45,3 T50,3 T55,3 T60,3 T65,3 T70,3 T75,3 T80,3 T85,3 T90,3 T95,3 T100,3"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <button
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-controls="status-widget-expanded"
        aria-label={isExpanded ? 'Collapse additional information' : 'Expand to see more'}
        style={{
          cursor: 'pointer',
          paddingTop: 'var(--space-2)',
          width: '100%',
          textAlign: 'left',
          border: 'none',
          background: 'transparent',
          color: 'inherit',
          font: 'inherit'
        }}
      >
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What's On These Days</p>

        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          <div style={{ width: '3rem', height: '3rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.25rem', overflow: 'hidden', flexShrink: 0 }}>
            <img
              src="https://f4.bcbits.com/img/a2439915176_16.jpg"
              alt="No One was Driving the Car album cover"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, marginBottom: '0.125rem' }}>No One was Driving the Car</p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 0 }}>La Dispute</p>
          </div>
        </div>

        <div
          id="status-widget-expanded"
          style={{
            display: 'grid',
            gridTemplateRows: isExpanded ? '1fr' : '0fr',
            transition: shouldAnimate ? (isExpanded ? 'grid-template-rows 0.4s ease-out' : 'grid-template-rows 0.3s ease-out') : 'none'
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Activity</p>
                <p style={{ fontSize: 'var(--text-xs)', marginBottom: 0 }}>Training for T100 - Olympic</p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Coffee Setup</p>
                <p style={{ fontSize: 'var(--text-xs)', marginBottom: 0 }}>Origami Ceramic + Fellow Stagg EKG</p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>EDC</p>
                <p style={{ fontSize: 'var(--text-xs)', marginBottom: 0 }}>AER Day Pack, Evergoods CAP 0.5</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-1)', color: 'var(--muted)', fontSize: 'var(--text-lg)', fontWeight: 700, padding: 'var(--space-1) 0', userSelect: 'none' }}>
          {isExpanded ? '−' : '+'}
        </div>
      </button>
    </div>
  );
}
