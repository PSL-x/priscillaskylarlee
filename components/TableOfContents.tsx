'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatusWidget from './StatusWidget';

interface TableOfContentsProps {
  items: Array<{ id: string; title: string }>;
  backLink?: { href: string; label: string };
}

export default function TableOfContents({ items, backLink }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  const toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveId(id);
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
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

  if (items.length === 0 && !backLink) return null;

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
      {backLink && (
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <Link
            href={backLink.href}
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              paddingLeft: 'var(--space-2)',
              borderLeft: '0.125rem solid transparent',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--foreground)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.5, flexShrink: 0 }} aria-hidden="true">
              <path d="M10 2L2 10M2 10H8M2 10V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {toTitleCase(backLink.label)}
          </Link>
        </div>
      )}
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
              {toTitleCase(title)}
            </a>
          </li>
        ))}
      </ul>

      <StatusWidget />
      </div>
    </nav>
  );
}
