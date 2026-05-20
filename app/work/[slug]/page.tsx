import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import TableOfContents from '@/components/TableOfContents';
import ExpandableSection from '@/components/ExpandableSection';
import ProjectNavigation from '@/components/ProjectNavigation';
import MasonryGrid, { MasonryItem } from '@/components/MasonryGrid';
import CoverImage from '@/components/CoverImage';
import EnlargeableImage from '@/components/EnlargeableImage';
import ImageWrapper from '@/components/ImageWrapper';
import ImageGrid from '@/components/ImageGrid';
import GridImage from '@/components/GridImage';
import EnlargeableVideo from '@/components/EnlargeableVideo';

type Params = Promise<{ slug: string }>;

// Define work projects in order
const workProjects = [
  { title: 'Data & Analytics Design System', slug: 'dna-designsystem' },
  { title: 'Consistency and Standardization', slug: 'consistency-standardization' },
];

// Shared ID generation function to ensure consistency
function generateId(text: string, counts: Record<string, number>): string {
  let id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

  // Handle duplicate IDs by appending a number
  if (counts[id] !== undefined) {
    counts[id]++;
    id = `${id}-${counts[id]}`;
  } else {
    counts[id] = 0;
  }

  return id;
}

// Custom components for MDX to add IDs to headings
const createComponents = (idCounts: Record<string, number>) => ({
  h2: (props: any) => {
    const text = props.children?.toString() || '';
    const id = generateId(text, idCounts);
    return <h2 id={id} {...props} />;
  },
  img: (props: any) => (
    <EnlargeableImage
      src={props.src}
      alt={props.alt || ''}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        borderRadius: '0.25rem',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        border: '1px solid var(--border)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        margin: 'var(--space-6) 0'
      }}
    />
  ),
  video: (props: any) => (
    <EnlargeableVideo
      src={props.src}
      autoPlay={props.autoPlay ?? true}
      muted={props.muted ?? true}
      loop={props.loop ?? true}
      playsInline={props.playsInline ?? true}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        borderRadius: '0.25rem',
        border: '1px solid var(--border)',
        margin: 'var(--space-6) 0'
      }}
    />
  ),
  VideoEmbed: (props: any) => (
    <EnlargeableVideo
      src={props.src}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        borderRadius: '0.25rem',
        border: '1px solid var(--border)',
        margin: 'var(--space-6) 0'
      }}
    />
  ),
  ExpandableSection,
  MasonryGrid,
  MasonryItem,
  ImageGrid,
  GridImage,
});

export default async function WorkPage({ params }: { params: Params }) {
  const { slug } = await params;
  const workDir = path.join(process.cwd(), 'content/work');
  const filePath = path.join(workDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Extract h2 headers from markdown content for table of contents
  const headingRegex = /^##\s+(.+)$/gm;
  const headings = [{ id: 'overview', title: 'Overview' }];
  const idCounts: Record<string, number> = {};
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1];
    const id = generateId(title, idCounts);
    headings.push({ id, title });
  }

  // Create components with the same idCounts for consistency
  const idCountsForComponents: Record<string, number> = {};
  const components = createComponents(idCountsForComponents);

  // Find previous and next projects
  const currentIndex = workProjects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? workProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < workProjects.length - 1 ? workProjects[currentIndex + 1] : null;

  return (
    <>
      <TableOfContents items={headings} />
      <article id="overview" style={{ maxWidth: '42.5rem', margin: '0 auto', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
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
        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
          fontSize: 'var(--text-sm)',
          color: 'var(--muted)',
          marginBottom: 'var(--space-3)'
        }}>
          <span>{data.company}</span>
          <span>·</span>
          <span>{data.year}</span>
        </div>
        {data.tags && data.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: data.coverImage ? 'var(--space-6)' : (data.summary ? 'var(--space-4)' : 0) }}>
            {data.tags.map((tag: string) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        )}

        {/* Cover Image */}
        {data.coverImage && (
          <CoverImage
            src={data.coverImage}
            alt={data.slug === 'dna-designsystem'
              ? 'Overview of DNA Design System component library'
              : `${data.title} cover`
            }
          />
        )}
      </header>

      {/* Divider Line */}
      <div style={{
        height: '0.0625rem',
        backgroundColor: 'var(--border)',
        marginBottom: 'var(--space-8)'
      }} />

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <MDXRemote source={content} components={components} />
      </div>

      {/* Case Study Request */}
      <p className="case-study-request">
        Detailed case study available on request.
      </p>

      {/* Previous/Next Navigation */}
      <ProjectNavigation prevProject={prevProject} nextProject={nextProject} />
    </article>
    </>
  );
}

export async function generateStaticParams() {
  const workDir = path.join(process.cwd(), 'content/work');
  const files = fs.readdirSync(workDir);

  return files.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}
