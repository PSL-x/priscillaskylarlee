'use client';

import { useEffect, useState } from 'react';

interface TableOfContentsProps {
  items: Array<{
    id: string;
    title: string;
  }>;
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveId(id);
      const yOffset = -80; // Offset from top
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      console.warn(`TableOfContents: Cannot scroll to element with id "${id}" - not found`);
    }
  };

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all currently intersecting entries
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Sort by how far up the page they are (topmost wins)
          visibleEntries.sort((a, b) => {
            const aTop = a.boundingClientRect.top;
            const bTop = b.boundingClientRect.top;
            return Math.abs(aTop) - Math.abs(bTop);
          });
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-100px 0px -50% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    );

    // Use a slight delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      items.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        } else {
          console.warn(`TableOfContents: Element with id "${id}" not found`);
        }
      });

      // Set initial active section based on scroll position
      const scrollPosition = window.scrollY;
      for (let i = items.length - 1; i >= 0; i--) {
        const element = document.getElementById(items[i].id);
        if (element && element.offsetTop <= scrollPosition + 150) {
          setActiveId(items[i].id);
          break;
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '15rem',
        backgroundColor: 'var(--background)',
        flexDirection: 'column',
        overflow: 'visible',
      }}
      className="table-of-contents"
      aria-label="Table of contents"
    >
      <div style={{ height: '100%', overflowY: 'auto', padding: 'var(--space-16) var(--space-2) var(--space-2) var(--space-2)' }}>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        {items.map(({ id, title }) => (
          <li key={id} style={{ listStyle: 'none' }}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(id);
              }}
              style={{
                fontSize: 'var(--text-sm)',
                color: activeId === id ? 'var(--foreground)' : 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                display: 'block',
                paddingLeft: 'var(--space-2)',
                borderLeft: activeId === id ? '0.125rem solid var(--foreground)' : '0.125rem solid transparent'
              }}
              onMouseEnter={(e) => {
                if (activeId !== id) e.currentTarget.style.color = 'var(--foreground)';
              }}
              onMouseLeave={(e) => {
                if (activeId !== id) e.currentTarget.style.color = 'var(--muted)';
              }}
              aria-current={activeId === id ? 'location' : undefined}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>

      {/* Now Playing Widget */}
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
        {/* Wavy separator line */}
        <div
          className="wavy-line-container"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            cursor: 'pointer'
          }}
        >
          <svg
            width="100%"
            height="6"
            viewBox="0 0 100 6"
            preserveAspectRatio="none"
            style={{
              opacity: 0.3
            }}
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
        {/* Entire widget as one clickable button */}
        <button
          onClick={handleToggle}
          aria-expanded={isExpanded}
          aria-controls="widget-expanded-content"
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
            <div style={{
              width: '3rem',
              height: '3rem',
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
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, marginBottom: '0.125rem' }}>No One was Driving the Car</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 0 }}>La Dispute</p>
            </div>
          </div>

          {/* Expanded Content - inside button */}
          <div
            id="widget-expanded-content"
            style={{
              display: 'grid',
              gridTemplateRows: isExpanded ? '1fr' : '0fr',
              transition: shouldAnimate ? (isExpanded ? 'grid-template-rows 0.4s ease-out' : 'grid-template-rows 0.3s ease-out') : 'none'
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {/* Activity */}
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Activity</p>
                  <p style={{ fontSize: 'var(--text-xs)', marginBottom: 0 }}>Training for T100 - Olympic</p>
                </div>

                {/* Coffee Setup */}
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Coffee Setup</p>
                  <p style={{ fontSize: 'var(--text-xs)', marginBottom: 0 }}>Origami Ceramic + Fellow Stagg EKG</p>
                </div>

                {/* EDC */}
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>EDC</p>
                  <p style={{ fontSize: 'var(--text-xs)', marginBottom: 0 }}>AER Day Pack, Evergoods CAP 0.5</p>
                </div>
              </div>
            </div>
          </div>

          {/* +/- indicator at bottom - inside button */}
          <div style={{
            textAlign: 'center',
            marginTop: 'var(--space-1)',
            color: 'var(--muted)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            padding: 'var(--space-1) 0',
            userSelect: 'none'
          }}>
            {isExpanded ? '−' : '+'}
          </div>
        </button>
      </div>
      </div>
    </nav>
  );
}
