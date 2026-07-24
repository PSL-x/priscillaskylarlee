import { concerts, graphNodes, graphEdges, satelliteMap } from './data';
import ConcertGraph from '@/components/ConcertGraph';
import ConcertTable from '@/components/ConcertTable';
import TableOfContents from '@/components/TableOfContents';
import Link from 'next/link';

const ArrowUpLeft = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', marginRight: '0.5rem', opacity: 0.5 }} aria-hidden="true">
    <path d="M10 2L2 10M2 10H8M2 10V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const tocItems = [
  { id: 'artists', title: 'Artists Seen Multiple Times' },
  { id: 'all-shows', title: 'All Shows' },
];

export default function ConcertLogPage() {
  return (
    <>
      <article style={{ maxWidth: '42.5rem', margin: '0 auto', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
        <div className="hide-when-toc" style={{ marginBottom: 'var(--space-4)' }}>
          <Link href="/playground" className="link-nav link-content" style={{ display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)' }}>
            <ArrowUpLeft /> Playground
          </Link>
        </div>

        {/* Header */}
        <header style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 'var(--space-1)' }}>
            <time dateTime="2026-05-13">13.05.2026</time>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <span className="tag-pill">music</span>
          </div>
        </header>

        {/* Content — wider than article max-width, so we break out */}
        <div style={{ width: '100%', maxWidth: '60rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <section id="artists" style={{ marginBottom: 'var(--space-8)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, marginBottom: 'var(--space-2)' }}>
              Artists seen multiple times
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginBottom: 'var(--space-4)' }}>
              {concerts.length} shows since {Math.min(...concerts.map(c => c.year))}.
            </p>
            <ConcertGraph nodes={graphNodes} edges={graphEdges} satelliteMap={satelliteMap} />
          </section>

          <div style={{ height: '0.0625rem', backgroundColor: 'var(--border)', marginBottom: 'var(--space-8)' }} />

          <section id="all-shows">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, marginBottom: 'var(--space-4)' }}>
              All shows
            </h2>
            <ConcertTable concerts={concerts} />
          </section>
        </div>
      </article>

      <TableOfContents items={tocItems} backLink={{ href: '/playground', label: 'Playground' }} />
    </>
  );
}
