'use client';

import Link from 'next/link';

interface ProjectNavigationProps {
  prevProject?: { title: string; slug: string } | null;
  nextProject?: { title: string; slug: string } | null;
}

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', marginLeft: '0.5rem', opacity: 0.5 }} aria-hidden="true">
    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowUpLeft = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', marginRight: '0.5rem', opacity: 0.5 }} aria-hidden="true">
    <path d="M10 2L2 10M2 10H8M2 10V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ProjectNavigation({ prevProject, nextProject }: ProjectNavigationProps) {
  return (
    <nav
      className="project-navigation"
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'var(--space-16)'
      }}
      aria-label="Project navigation"
    >
      <div style={{ flex: 1 }}>
        {prevProject && (
          <Link
            href={`/work/${prevProject.slug}`}
            className="link-nav link-content"
          >
            <ArrowUpLeft />
            <span>{prevProject.title}</span>
          </Link>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        {nextProject && (
          <Link
            href={`/work/${nextProject.slug}`}
            className="link-nav link-content"
          >
            <span>{nextProject.title}</span>
            <ArrowUpRight />
          </Link>
        )}
      </div>
    </nav>
  );
}
