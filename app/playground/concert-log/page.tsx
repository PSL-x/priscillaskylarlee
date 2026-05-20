import { concerts, graphNodes, graphEdges, satelliteMap } from './data';
import ConcertGraph from '@/components/ConcertGraph';
import ConcertTable from '@/components/ConcertTable';

export default function ConcertLogPage() {
  return (
    <div style={{ maxWidth: '60rem', margin: '0 auto', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 400,
          marginBottom: 'var(--space-2)',
        }}>
          Concert Log
        </h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--muted)', marginBottom: 0 }}>
          {concerts.length} shows since {Math.min(...concerts.map(c => c.year))}.
        </p>
      </header>

      <div style={{ height: '0.0625rem', backgroundColor: 'var(--border)', marginBottom: 'var(--space-8)' }} />

      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, marginBottom: 'var(--space-4)' }}>
          Artists seen multiple times
        </h2>
        <ConcertGraph nodes={graphNodes} edges={graphEdges} satelliteMap={satelliteMap} />
      </section>

      <div style={{ height: '0.0625rem', backgroundColor: 'var(--border)', marginBottom: 'var(--space-8)' }} />

      <section>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, marginBottom: 'var(--space-4)' }}>
          All shows
        </h2>
        <ConcertTable concerts={concerts} />
      </section>
    </div>
  );
}
