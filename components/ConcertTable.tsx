'use client';

import { useState, useMemo } from 'react';
import { Concert } from '@/app/playground/concert-log/data';

interface Props {
  concerts: Concert[];
}

type SortKey = 'date' | 'number';
type SortDir = 'asc' | 'desc';

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const selectStyle: React.CSSProperties = {
  backgroundColor: 'var(--tag-bg)',
  border: '0.0625rem solid var(--border)',
  borderRadius: '0.25rem',
  color: 'var(--foreground)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
  padding: '0.3rem 0.5rem',
  cursor: 'pointer',
  outline: 'none',
};

export default function ConcertTable({ concerts }: Props) {
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const years = useMemo(() =>
    [...new Set(concerts.map(c => c.year))].sort((a, b) => b - a),
    [concerts]
  );

  const cities = useMemo(() =>
    [...new Set(concerts.map(c => c.city))].sort(),
    [concerts]
  );

  const filtered = useMemo(() => {
    let result = concerts;
    if (yearFilter !== 'all') result = result.filter(c => c.year === parseInt(yearFilter));
    if (cityFilter !== 'all') result = result.filter(c => c.city === cityFilter);
    return [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'date') cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortKey === 'number') cmp = a.number - b.number;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [concerts, yearFilter, cityFilter, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir(key === 'date' ? 'desc' : 'asc');
    }
  };

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return null;
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-xs)',
    color: 'var(--muted)',
    fontWeight: 400,
    padding: '0 0 var(--space-1)',
    borderBottom: '0.0625rem solid var(--border)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  };

  const sortBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'var(--muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-xs)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    padding: 0,
  };

  return (
    <div>
      <style jsx>{`
        .venue-col { display: table-cell; }
        .notes-col { display: table-cell; }
        @media (max-width: 768px) {
          .notes-col { display: none; }
        }
        @media (max-width: 640px) {
          .venue-col { display: none; }
        }
      `}</style>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
        <select value={yearFilter} onChange={e => setYearFilter(e.target.value)} style={selectStyle} aria-label="Filter by year">
          <option value="all">All years</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} style={selectStyle} aria-label="Filter by city">
          <option value="all">All cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--muted)', alignSelf: 'center' }}>
          {filtered.length} show{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: '2.5rem' }}>
              <button style={sortBtnStyle} onClick={() => handleSort('number')} aria-sort={sortKey === 'number' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}>
                #{sortIndicator('number')}
              </button>
            </th>
            <th style={thStyle}>Artist</th>
            <th style={{ ...thStyle }} className="venue-col">Venue</th>
            <th style={{ ...thStyle, width: '7rem' }}>City</th>
            <th style={{ ...thStyle, width: '7rem' }}>
              <button style={sortBtnStyle} onClick={() => handleSort('date')} aria-sort={sortKey === 'date' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}>
                Date{sortIndicator('date')}
              </button>
            </th>
            <th style={thStyle} className="notes-col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((concert, i) => (
            <tr
              key={i}
              style={{ borderBottom: '0.0625rem solid var(--border)', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--tag-bg)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <td style={{ padding: 'var(--space-1) 0', fontSize: 'var(--text-xs)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', verticalAlign: 'top' }}>
                {concert.number}
              </td>
              <td style={{ padding: 'var(--space-1) var(--space-2) var(--space-1) 0', verticalAlign: 'top' }}>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
                  {concert.isFestival ? <em style={{ color: 'var(--muted)' }}>{concert.headline}</em> : concert.headline}
                </div>
                {!concert.isFestival && concert.artists.length > 1 && (
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
                    w/ {concert.artists.slice(1).join(', ')}
                  </div>
                )}
              </td>
              <td style={{ padding: 'var(--space-1) var(--space-2) var(--space-1) 0', fontSize: 'var(--text-xs)', color: 'var(--muted)', verticalAlign: 'top' }} className="venue-col">
                {concert.venue}
              </td>
              <td style={{ padding: 'var(--space-1) var(--space-2) var(--space-1) 0', fontSize: 'var(--text-xs)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', verticalAlign: 'top' }}>
                {concert.city}
              </td>
              <td style={{ padding: 'var(--space-1) var(--space-2) var(--space-1) 0', fontSize: 'var(--text-xs)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                {formatDate(concert.date)}
              </td>
              <td style={{ padding: 'var(--space-1) 0', fontSize: 'var(--text-xs)', color: 'var(--muted)', verticalAlign: 'top' }} className="notes-col">
                {concert.notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
