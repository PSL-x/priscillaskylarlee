import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PlaygroundClient from '@/components/PlaygroundClient';

interface PlaygroundItem {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  images?: string[];
  video?: string;
}

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
        tags: data.tags || [],
        excerpt: data.excerpt,
        images: data.images || [],
        video: data.video || null,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const tags = [...new Set(items.flatMap(i => i.tags))].sort();

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

      <PlaygroundClient items={items} tags={tags} />
    </div>
  );
}
