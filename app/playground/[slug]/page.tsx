import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import TableOfContents from '@/components/TableOfContents';

const ArrowUpLeft = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', marginRight: '0.5rem', opacity: 0.5 }} aria-hidden="true">
    <path d="M10 2L2 10M2 10H8M2 10V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type Params = Promise<{ slug: string }>;

function generateId(text: string, counts: Record<string, number>): string {
  let id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  if (counts[id] !== undefined) {
    counts[id]++;
    id = `${id}-${counts[id]}`;
  } else {
    counts[id] = 0;
  }
  return id;
}

const createComponents = (idCounts: Record<string, number>) => ({
  h2: (props: any) => {
    const text = props.children?.toString() || '';
    const id = generateId(text, idCounts);
    return <h2 id={id} {...props} />;
  },
});

export default async function PlaygroundItemPage({ params }: { params: Params }) {
  const { slug } = await params;
  const playgroundDir = path.join(process.cwd(), 'content/playground');
  const filePath = path.join(playgroundDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Extract h2 headings for TOC
  const headingRegex = /^##\s+(.+)$/gm;
  const headings: { id: string; title: string }[] = [];
  const idCounts: Record<string, number> = {};
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1];
    const id = generateId(title, idCounts);
    headings.push({ id, title });
  }

  const titleId = 'top';
  const tocItems = [
    { id: titleId, title: data.title },
    ...headings,
  ];

  const idCountsForComponents: Record<string, number> = {};
  const components = createComponents(idCountsForComponents);

  return (
    <>
      <article id="top" style={{ maxWidth: '42.5rem', margin: '0 auto', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
        <div className="hide-when-toc" style={{ marginBottom: 'var(--space-4)' }}>
          <Link href="/playground" className="link-nav link-content" style={{ display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)' }}>
            <ArrowUpLeft /> Playground
          </Link>
        </div>

        {/* Header */}
        <header style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-3xl)',
            marginBottom: 'var(--space-2)',
            fontWeight: 400
          }}>
            {data.title}
          </h1>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 'var(--space-2)' }}>
            <time dateTime={data.date}>
              {new Date(data.date).toLocaleDateString('en-GB').replace(/\//g, '.')}
            </time>
          </div>
          {data.tags && data.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: data.images ? 'var(--space-6)' : 0 }}>
              {data.tags.map((tag: string) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          )}
          {data.images && data.images.length > 0 && (
            <div style={{
              borderRadius: '0.5rem',
              overflow: 'hidden',
              aspectRatio: '16 / 9',
              marginTop: 'var(--space-4)',
              border: '0.0625rem solid var(--border)',
            }}>
              <img
                src={data.images[0]}
                alt={data.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}
        </header>

        {/* Divider */}
        <div style={{ height: '0.0625rem', backgroundColor: 'var(--border)', marginBottom: 'var(--space-8)' }} />

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <MDXRemote source={content} components={components} />
        </div>
      </article>

      <TableOfContents items={tocItems} backLink={{ href: '/playground', label: 'Playground' }} />
    </>
  );
}

export async function generateStaticParams() {
  const playgroundDir = path.join(process.cwd(), 'content/playground');
  const files = fs.readdirSync(playgroundDir);

  return files.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}
