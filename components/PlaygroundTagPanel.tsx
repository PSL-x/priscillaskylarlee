'use client';

import StatusWidget from './StatusWidget';

interface Props {
  tags: string[];
  activeTag: string | null;
  onTagClick: (tag: string) => void;
}

export default function PlaygroundTagPanel({ tags, activeTag, onTagClick }: Props) {
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
      aria-label="Filter by tag"
    >
      <div style={{ height: '100%', overflowY: 'auto', padding: 'var(--space-16) var(--space-2) var(--space-2) var(--space-2)' }}>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)', paddingLeft: 'var(--space-2)' }}>
          Filter
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', paddingLeft: 'var(--space-2)' }}>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="tag-pill"
              style={{
                cursor: 'pointer',
                border: 'none',
                fontFamily: 'inherit',
                ...(activeTag === tag ? {
                  backgroundColor: 'var(--foreground)',
                  color: 'var(--background)',
                } : {})
              }}
              aria-pressed={activeTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>

        <StatusWidget />
      </div>
    </nav>
  );
}
