import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function GET() {
  const playgroundDir = path.join(process.cwd(), 'content/playground');
  const files = fs.readdirSync(playgroundDir);

  const items = files
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

  return NextResponse.json(items);
}
