'use client';

import { useState } from 'react';

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', marginLeft: '0.5rem', opacity: 0.5 }} aria-hidden="true">
    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ResumePage() {
  // const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ maxWidth: '42.5rem', margin: '0 auto', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <h1 className="font-serif text-5xl mb-16">Resume</h1>

      {/* <section className="mb-16">
        <h2 className="font-serif text-3xl mb-8">Experience</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, fontWeight: 500 }}>
                  Design System and Quality Lead
                </h3>
                <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>SAP</span>
              </div>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Present</span>
            </div>

            <div style={{ marginBottom: 'var(--space-3)' }}>
              <p style={{ color: 'var(--foreground)', marginBottom: 0, lineHeight: 1.6, fontSize: 'var(--text-base)' }}>
                Leading Design Quality and Design Systems for SAP's Data & Analytics Design Organization through cross-function alignment.
              </p>
            </div>

            <div style={{
              paddingLeft: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)'
            }}>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: 'var(--muted)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                aria-expanded={isExpanded}
              >
                Senior User Experience Designer
              </button>

              {isExpanded && (
                <div style={{
                  paddingLeft: 'var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--muted)'
                  }}>
                    User Experience Designer
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      <section className="mb-16">
        <h2 className="font-serif text-3xl mb-8">Education</h2>
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="font-serif text-2xl">B.S. Interactive Arts & Technology, Computer Science</h3>
          </div>
          <p className="text-muted">Simon Fraser University · Vancouver, BC, Canada</p>
        </div>
      </section>


      <section>
        <a
          href="#"
          className="link-nav link-content"
          style={{ padding: 'var(--space-2) var(--space-3)', border: '0.0625rem solid var(--border)', borderRadius: '0.25rem', transition: 'border-color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          Download PDF <ArrowUpRight />
        </a>
      </section> */}
    </div>
  );
}
