'use client';

import { useState } from 'react';
import Link from 'next/link';
import PlaygroundTagPanel from './PlaygroundTagPanel';

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', marginLeft: '0.5rem', opacity: 0.5 }} aria-hidden="true">
    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface PlaygroundItem {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  images?: string[];
  video?: string;
}

interface Props {
  items: PlaygroundItem[];
  tags: string[];
}

export default function PlaygroundClient({ items, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    setActiveTag(prev => prev === tag ? null : tag);
  };

  const filtered = activeTag ? items.filter(i => i.tags.includes(activeTag)) : items;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {filtered.map((item) => (
          <Link key={item.slug} href={`/playground/${item.slug}`} style={{ display: 'block', paddingBottom: 'var(--space-8)', borderBottom: '0.0625rem solid var(--border)' }} className="playground-item project-card">
            {item.video && (
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '0.25rem',
                overflow: 'hidden',
                aspectRatio: '16 / 9',
                marginBottom: 'var(--space-3)'
              }} className="project-image">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              </div>
            )}
            {!item.video && item.images && item.images.length > 0 && (
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '0.25rem',
                overflow: 'hidden',
                aspectRatio: '16 / 9',
                transition: 'opacity 0.2s',
                marginBottom: 'var(--space-3)'
              }} className="project-image">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}
            <h3 className="project-title">
              {item.title} <ArrowUpRight />
            </h3>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginTop: 'var(--space-1)', marginBottom: 'var(--space-1)' }}>
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString('en-GB').replace(/\//g, '.')}
              </time>
            </div>
            {item.tags && item.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap', marginBottom: 'var(--space-1)' }}>
                {item.tags.map((tag: string) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            )}
            <p style={{ color: 'var(--muted)' }}>
              {item.excerpt}
            </p>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>No items with that tag.</p>
        )}
      </div>

      <PlaygroundTagPanel tags={tags} activeTag={activeTag} onTagClick={handleTagClick} />
    </>
  );
}
