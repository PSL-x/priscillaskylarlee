import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

type Params = Promise<{ slug: string }>;

const ArrowUpLeft = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', marginRight: '0.5rem', opacity: 0.5 }} aria-hidden="true">
    <path d="M10 2L2 10M2 10H8M2 10V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default async function PlaygroundItemPage({ params }: { params: Params }) {
  const { slug } = await params;
  const playgroundDir = path.join(process.cwd(), 'content/playground');
  const filePath = path.join(playgroundDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return (
    <article style={{ maxWidth: '42.5rem', margin: '0 auto', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      {/* Back Link */}
      <Link
        href="/playground"
        className="link-nav link-content"
        style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}
      >
        <ArrowUpLeft /> Back to playground
      </Link>

      {/* Header */}
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 'var(--space-1)' }}>
          <time dateTime={data.date}>
            {new Date(data.date).toLocaleDateString('en-GB').replace(/\//g, '.')}
          </time>
        </div>
        {data.tags && data.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {data.tags.map((tag: string) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const playgroundDir = path.join(process.cwd(), 'content/playground');
  const files = fs.readdirSync(playgroundDir);

  return files.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}
