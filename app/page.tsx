import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import TableOfContents from '@/components/TableOfContents';
import FlipWord from '@/components/FlipWord';

interface ProjectData {
  slug: string;
  title: string;
  company: string;
  year: string;
  tags?: string[];
  coverImage?: string;
  summary: string;
}

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', marginLeft: '0.5rem', opacity: 0.5 }} aria-hidden="true">
    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const tocItems = [
  { id: 'intro', title: 'Intro' },
  { id: 'projects', title: 'Projects' },
  // { id: 'values', title: 'Values' },
  // { id: 'playground', title: 'Playground' },
  { id: 'contact', title: 'Contact' },
];

export default function HomePage() {
  // Read work files
  const workDir = path.join(process.cwd(), 'content/work');
  const files = fs.readdirSync(workDir);

  const projects: ProjectData[] = files
    .map((filename) => {
      const filePath = path.join(workDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      return {
        slug: filename.replace('.md', ''),
        ...data
      } as ProjectData;
    })
    .filter((project: any) => !project.hidden); // Exclude hidden projects

  // Sort projects: dna-designsystem first, then others
  const sortedProjects = projects.sort((a, b) => {
    if (a.slug === 'dna-designsystem') return -1;
    if (b.slug === 'dna-designsystem') return 1;
    return 0;
  });

  return (
    <>
      <div style={{ maxWidth: '42.5rem', margin: '0 auto', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
        {/* Intro */}
        <section style={{ marginBottom: 'var(--space-16)' }} id="intro">
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-3xl)',
            marginBottom: 'var(--space-2)',
            fontWeight: 400
          }}>
            Priscilla Skylar Lee
          </h1>
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>
            Designer. Tinkerer. Connector. <FlipWord />
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 'var(--space-2)', fontStyle: 'italic' }}>
            *always comes with a side of grit
          </p>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-1)', marginBottom: 'var(--space-6)' }}>
            <div
              className="status-pulse"
              style={{ width: '0.375rem', height: '0.375rem', minWidth: '0.375rem', minHeight: '0.375rem', borderRadius: '50%', backgroundColor: 'var(--status-active)', marginTop: '0.45rem' }}
              role="img"
              aria-label="Available status indicator"
            />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>Currently building reusable elements to enable SAP's Data & Analytics Team</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', alignItems: 'flex-start' }}>
            <p>
              Growing up across multiple countries and cultures meant learning early that the little things shape everything — the best way to honour that is to build intent into systems from the start.
            </p>
            <p style={{ marginBottom: 'var(--space-1)' }}>
              Scalable, consistent experiences are a form of communication, and inclusion is how we foster communities that grow and thrive. I do my best to lead by instilling empathy and integrity at every layer.
            </p>
            <div style={{ marginTop: 'var(--space-1)' }}>
              <Link href="/about" className="link-nav link-content">
                About <ArrowUpRight />
              </Link>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section style={{ marginBottom: 'var(--space-16)' }} id="projects">
          <h2>Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {sortedProjects.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`} style={{ display: 'block' }} className="project-card">
                <div style={{
                  marginBottom: 'var(--space-3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '0.25rem',
                  aspectRatio: '16 / 9',
                  overflow: 'hidden',
                  transition: 'opacity 0.2s'
                }} className="project-image">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={`${project.title} cover`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
                      Project cover image
                    </div>
                  )}
                </div>
                <h3 className="project-title">
                  {project.title} <ArrowUpRight />
                </h3>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginTop: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
                  {project.company} · {project.year}
                </p>
                <p style={{ color: 'var(--muted)' }}>
                  {project.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Values */}
        {/* <section style={{ marginBottom: 'var(--space-8)' }} id="values">
          <h2>Values</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <h3>Craft</h3>
              <p>
                Good work takes time. I believe in sweating the details, iterating until it feels
                right, and building things that will last. There are no shortcuts to quality.
              </p>
            </div>
            <div>
              <h3>Clarity</h3>
              <p>
                The best solutions are often the simplest ones. I strive to cut through complexity,
                remove the unnecessary, and make things clear. If it's hard to understand, it's not
                done yet.
              </p>
            </div>
            <div>
              <h3>Impact</h3>
              <p>
                Design isn't decoration—it's a tool for solving real problems. I focus on outcomes
                over aesthetics, measuring success by how well something works, not just how it looks.
              </p>
            </div>
          </div>
        </section> */}

        {/* Playground Preview */}
        {/* <section style={{ marginBottom: 'var(--space-8)' }} id="playground">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ marginBottom: 0 }}>
              Playground
            </h2>
            <Link href="/playground" style={{ display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-xs)', color: 'var(--muted)', transition: 'color 0.2s' }}>
              View all <ArrowUpRight />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <article style={{ paddingBottom: 'var(--space-4)', borderBottom: '0.0625rem solid var(--border)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 'var(--space-2)' }}>
                <span>Mar 10, 2026</span>
                <span>·</span>
                <span>edc, making</span>
              </div>
              <h3 style={{ marginBottom: 'var(--space-1)' }}>
                <Link href="/playground/building-a-custom-keyboard">
                  Building a Custom Keyboard
                </Link>
              </h3>
              <p>
                Notes on my first attempt at building a mechanical keyboard from scratch. What I
                learned about soldering, switch selection, and the rabbit hole of keycap profiles.
              </p>
            </article>

            <article style={{ paddingBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 'var(--space-2)' }}>
                <span>Mar 5, 2026</span>
                <span>·</span>
                <span>design, thinking</span>
              </div>
              <h3 style={{ marginBottom: 'var(--space-1)' }}>
                <Link href="/playground/design-systems-evolution">
                  How Design Systems Evolve
                </Link>
              </h3>
              <p>
                Thoughts on the lifecycle of design systems and why the best ones are never really
                "done". Some patterns emerge from observing how teams actually work.
              </p>
            </article>
          </div>
        </section> */}

        {/* Contact */}
        <section style={{ marginBottom: 'var(--space-8)' }} id="contact">
          <h2>Reach Out</h2>
          <p>
            I'm available for select projects. If you're working on something interesting and think I might be a good fit, feel free to reach out.
          </p>
          <a
            href="mailto:priscillaskylarlee@gmail.com"
            className="link-nav link-content"
          >
            Email Me <ArrowUpRight />
          </a>
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </>
  );
}
