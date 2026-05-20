import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface PlaygroundItem {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  type?: 'text' | 'visual';
  images?: string[];
}

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', marginLeft: '0.5rem', opacity: 0.5 }} aria-hidden="true">
    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PlaygroundPage() {
  const playgroundDir = path.join(process.cwd(), 'content/playground');
  const files = fs.readdirSync(playgroundDir);

  const items: PlaygroundItem[] = files
    .map((filename) => {
      const filePath = path.join(playgroundDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      return {
        slug: filename.replace('.md', ''),
        title: data.title,
        date: data.date,
        tags: data.tags,
        excerpt: data.excerpt,
        type: data.type || 'text',
        images: data.images || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div style={{ maxWidth: '42.5rem', margin: '0 auto', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <header style={{ marginBottom: 'var(--space-12)' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-3xl)',
          marginBottom: 'var(--space-3)',
          fontWeight: 400
        }}>
          Playground
        </h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)', marginBottom: 0 }}>
          Design explorations, writing, making, and thinking out loud. A collection of experiments
          and observations.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {items.map((item) => (
          <Link key={item.slug} href={`/playground/${item.slug}`} style={{ display: 'block', paddingBottom: 'var(--space-8)', borderBottom: '0.0625rem solid var(--border)' }} className="playground-item project-card">
            {/* Visual post - image first */}
            {item.type === 'visual' && item.images && item.images.length > 0 && (
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

            {/* Title */}
            <h3 className="project-title">
              {item.title} <ArrowUpRight />
            </h3>

            {/* Date */}
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginTop: 'var(--space-1)', marginBottom: 'var(--space-1)' }}>
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString('en-GB').replace(/\//g, '.')}
              </time>
            </div>

            {/* Excerpt */}
            <p style={{ color: 'var(--muted)' }}>
              {item.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
