'use client';

import { useState } from 'react';
import TableOfContents from '@/components/TableOfContents';


const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', marginLeft: '0.5rem', opacity: 0.5 }} aria-hidden="true">
    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const tocItems = [
  { id: 'intro', title: 'About' },
  { id: 'currently', title: 'Current' },
  { id: 'background', title: 'Background' },
];

export default function AboutPage() {
  const [showFullContent, setShowFullContent] = useState(true);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      setShowFullContent(!showFullContent);
      // Focus the newly selected tab
      const newTab = showFullContent ? 1 : 0;
      const buttons = e.currentTarget.querySelectorAll('button');
      (buttons[newTab] as HTMLButtonElement)?.focus();
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(1rem);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .content-block {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .content-block:nth-child(1) { animation-delay: 0.1s; }
        .content-block:nth-child(2) { animation-delay: 0.2s; }
        .content-block:nth-child(3) { animation-delay: 0.3s; }
        .content-block:nth-child(4) { animation-delay: 0.4s; }
        .content-block:nth-child(5) { animation-delay: 0.5s; }

        /* Photo Grid: Mixed Layout with Hover Expansion */
        .mixed-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: var(--space-2);
          aspect-ratio: 2 / 1;
          width: 100%;
        }

        .mixed-grid-item {
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
          overflow: hidden;
          border: 1px solid var(--border);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .mixed-grid-item:first-child {
          grid-row: 1 / 3;
        }

        .mixed-grid:hover .mixed-grid-item {
          filter: brightness(0.6);
          transform: scale(0.98);
        }

        .mixed-grid .mixed-grid-item:hover {
          filter: brightness(1);
          transform: scale(1.02);
          z-index: 10;
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 48rem) {
          .mixed-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            aspect-ratio: auto;
          }
          .mixed-grid-item:first-child {
            grid-row: auto;
          }
        }
        /* Values Display */
        .values-header {
          margin-bottom: var(--space-4);
        }
        .values-list {
          font-family: var(--font-serif);
          font-size: var(--text-3xl);
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: 0.02em;
        }

        .intro-layout {
          margin-bottom: var(--space-8);
        }

        .intro-content {
          display: flex;
          gap: var(--space-4);
          align-items: flex-start;
        }

        .intro-photo {
          width: 12rem;
          height: 12rem;
          min-width: 12rem;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
          border: 1px solid var(--border);
          overflow: hidden;
        }

        .intro-text {
          flex: 1;
        }

        @media (max-width: 48rem) {
          .values-list {
            font-size: var(--text-2xl);
          }
          .intro-content {
            flex-direction: column;
          }
          .intro-photo {
            width: 100%;
            height: auto;
            aspect-ratio: 1;
          }
        }
      `}</style>
      <div style={{ maxWidth: '42.5rem', margin: '0 auto', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
        <div className="intro-layout">
          <h1 className="values-header values-list" id="intro">
            Fail Again. Fail Better.
          </h1>

          <div className="intro-content">
            {/* Photo */}
            <div className="intro-photo">
              <img
                src="/images/about/profile.jpg"
                alt="Priscilla Skylar Lee"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Text */}
            <div className="intro-text">
              <p style={{ fontSize: 'var(--text-md)', marginBottom: 0, color: 'var(--muted)' }}>
                I build for humans, which means building for imperfection. Collaboration is key... figuring out what matters, testing assumptions, learning what doesn't work, what does, and growing together each step of the way. Solutions aren't found alone or on the first attempt. They emerge through iteration, dwelling with the problem and the people you're solving it with. Not graceful, not immediate, never easy – but always meaningful.
              </p>
            </div>
          </div>
        </div>

        {/* Current Section */}
        <section style={{ marginBottom: 'var(--space-16)' }} id="currently">
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-2xl)',
            marginBottom: 'var(--space-4)',
            fontWeight: 400,
            letterSpacing: '0.02em'
          }}>Current</h2>
          <div className="space-y-4 text-foreground">
            <p style={{ marginBottom: 'var(--space-6)' }}>
              Right now, I'm leading Design Systems and Quality at SAP's Data & Analytics Design Organization.
            </p>

            <p style={{ marginBottom: 'var(--space-6)' }}>
              The world is at an important intersection – as AI tools make it easy to build fast, we need to identify what deserves to be systematic. <span className="highlight-animate">It's critical for us to govern where human judgement is needed.</span> Design systems aren't just component libraries anymore, they're frameworks for determining where consistency enables connection, and where variation preserves humanity. Without the human factor, elements can (and will) get lost in human understanding.
            </p>

            <div className="mt-6">
              <h3 style={{ marginBottom: 'var(--space-1)' }}>Explorations:</h3>
              <ul className="list-disc" style={{ paddingLeft: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {/* <li>Finding ways to enable distributed teams to work together better</li> */}
                <li>Exploring human agency and what it means to build responsibly in a world where AI is moving faster than our ethics are</li>
                <li>Reflecting on what it means to navigate life while frequently feeling at the mercy of forces beyond our control — chance, societal pressure, and the systems we're all quietly shaped by</li>
                <li>Thinking about what fosters genuine human connection and what makes relationships feel truly deep</li>

              </ul>
            </div>

            <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '0.0625rem solid var(--border)' }} className="mobile-only-grid">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Now Playing</p>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <div style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '0.25rem',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      <img
                        src="https://f4.bcbits.com/img/a2439915176_16.jpg"
                        alt="No One was Driving the Car album cover"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: '0.125rem' }}>No One was Driving the Car</p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginBottom: 0 }}>La Dispute</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Activity</p>
                  <p style={{ fontSize: 'var(--text-sm)', marginBottom: 0 }}>Training for T100 - Olympic</p>
                </div>

                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Coffee Setup</p>
                  <p style={{ fontSize: 'var(--text-sm)', marginBottom: 0 }}>Origami Ceramic + Fellow Stagg EKG</p>
                </div>

                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>EDC</p>
                  <p style={{ fontSize: 'var(--text-sm)', marginBottom: 0 }}>AER Day Pack, Evergoods CAP 0.5</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Background Section */}
        <section style={{ marginBottom: 'var(--space-16)' }} id="background">
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-2xl)',
            marginBottom: 'var(--space-4)',
            fontWeight: 400,
            letterSpacing: '0.02em'
          }}>Background</h2>

          {/* Photo Grid */}
          <div className="mixed-grid" style={{ marginBottom: 'var(--space-8)' }}>
            <div className="mixed-grid-item">
              <img
                src="/images/about/photo-1.jpg"
                alt="Activity or hobby"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div className="mixed-grid-item">
              <img
                src="/images/about/photo-2.jpg"
                alt="Activity or hobby"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div className="mixed-grid-item">
              <img
                src="/images/about/photo-3.jpg"
                alt="Activity or hobby"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* Switch Control */}
        <div
          role="tablist"
          aria-label="Content view selector"
          onKeyDown={handleKeyDown}
          style={{
            display: 'flex',
            gap: 'var(--space-1)',
            marginBottom: 'var(--space-4)',
            padding: 'var(--space-0)',
            backgroundColor: 'var(--sidebar-bg)',
            border: '0.0625rem solid var(--border)',
            borderRadius: 'var(--space-1)',
            width: 'fit-content'
          }}
        >
          <button
            role="tab"
            aria-selected={showFullContent}
            aria-controls="full-content"
            tabIndex={showFullContent ? 0 : -1}
            onClick={() => setShowFullContent(true)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: 'var(--space-1) var(--space-2)',
              backgroundColor: showFullContent ? 'var(--background)' : 'transparent',
              color: showFullContent ? 'var(--foreground)' : 'var(--muted)',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!showFullContent) {
                e.currentTarget.style.color = 'var(--foreground)';
              }
            }}
            onMouseLeave={(e) => {
              if (!showFullContent) {
                e.currentTarget.style.color = 'var(--muted)';
              }
            }}
          >
            Full Story
          </button>
          <button
            role="tab"
            aria-selected={!showFullContent}
            aria-controls="tldr-content"
            tabIndex={!showFullContent ? 0 : -1}
            onClick={() => setShowFullContent(false)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '0.5rem 1rem',
              backgroundColor: !showFullContent ? 'var(--background)' : 'transparent',
              color: !showFullContent ? 'var(--foreground)' : 'var(--muted)',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (showFullContent) {
                e.currentTarget.style.color = 'var(--foreground)';
              }
            }}
            onMouseLeave={(e) => {
              if (showFullContent) {
                e.currentTarget.style.color = 'var(--muted)';
              }
            }}
          >
            TL;DR
          </button>
        </div>

        {/* Short Version */}
        {!showFullContent && (
          <div
            id="tldr-content"
            role="tabpanel"
            aria-labelledby="tldr-tab"
            style={{ marginBottom: 'var(--space-16)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
          >
            <p className="content-block">
              Grew up across multiple countries, studied design and computing science. The blend of technical foundation, design thinking, and being a third culture kid, shapes how I approach everything.
            </p>
            <p className="content-block">
              I believe inclusion and accessibility aren't features to be added after the fact — they're the foundation. Scalable, consistent experiences are a form of communication. When people understand what's going on, they feel included. And when people feel included, they contribute. That's the lens I lead with, and a piece of what I hold my work to.
            </p>
            <p className="content-block">
              Outside work: training for triathlons, coaching dodgeball, attending hardcore concerts, tinkering with things, and dialing in my V60 brew.
            </p>
            <p className="content-block">
              I value {''}
              <span className="highlight-animate">integrity, humility, grit,</span>
              {' '}and <span className="highlight-animate highlight-animate-second"> doing work that matters.
                </span>{' '}If that resonates with you, <a
                href="mailto:priscillaskylarlee@gmail.com"
                className="link-nav link-content"
              >
                drop me a line <ArrowUpRight />
              </a>
            </p>
          </div>
        )}

        {/* Full Content */}
        {showFullContent && (
          <div
            id="full-content"
            role="tabpanel"
            aria-labelledby="full-story-tab"
            style={{ marginBottom: 'var(--space-16)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
          >
            <p className="content-block">
              Growing up, I was sold the idea that technology was <em>the</em> vehicle for making all facets of the world better. I was all for it – I loved the newest tech gadgets and wanted to know how they worked. I studied both design and computing science to understand the creation process, but also to explore how things could be built better. Over time, my relationship with the future has grown complex. Technology moves faster than our understanding of what it means to be human, and I've learned that the most important work isn't about building faster – it's about sitting with the messiness and imperfection first.
            </p>
            <p className="content-block">
              That perspective came from being uprooted. At 10, I had to pack up my steady Canadian childhood for Dubai (more commonly known as "the sand pit"). It was simultaneously the worst and best thing that happened to me, but what followed was a lot of new places, new people, new adventures, and the slow realization that the gaps nobody bothers to fill are usually filled with the things that matter the most.
            </p>
            <p className="content-block">
              I'm a believer in systems thinking — the best experiences emerge from understanding the underlying patterns and constraints, not just the surface. Scalable, consistent experiences are really just a form of communication. When people understand what's going on, they feel included. And when people feel included, they contribute. That's not a 'nice-to-have', it's how communities grow and thrive. Accessibility, inclusivity, and ethical considerations don't have to be retrofitted. They can be built into the core. That's the lens I lead with, and where I try to fill the gaps that are easy to overlook.
            </p>

            <p className="content-block">
                Outside of work, you'll find me training for my next triathlon, coaching competitive dodgeball, singing my heart out a hardcore concert, breaking something apart to learn how it works, or dialing in my V60 brew.
            </p>

            <p className="content-block">
              I value {''}
              <span className="highlight-animate">integrity, humility, grit,</span>
              {' '}and <span className="highlight-animate highlight-animate-second"> doing work that matters.
                </span>{' '}If that resonates with you, <a
                href="mailto:priscillaskylarlee@gmail.com"
                className="link-nav link-content"
              >
                drop me a line <ArrowUpRight />
              </a>
            </p>
          </div>
        )}
      </section>

      {/* <section style={{ marginBottom: 'var(--space-16)' }}>
        <h2 className="font-serif text-3xl mb-8" id="contact">Get in Touch</h2>
        <div className="space-y-4">
          <p className="text-foreground">
            I'm currently available for select freelance projects and consulting work. If you'd like
            to work together, or just want to say hi, drop me a line.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="mailto:hello@example.com"
              className="text-accent hover:opacity-70 transition-opacity"
            >
              Email
            </a>
            <a
              href="#"
              className="text-accent hover:opacity-70 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-accent hover:opacity-70 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
      </section> */}
    </div>
    <TableOfContents items={tocItems} />
    </>
  );
}
