'use client';

import { CSSProperties, Children, cloneElement, isValidElement } from 'react';
import EnlargeableImage from './EnlargeableImage';

interface MasonryGridProps {
  children: React.ReactNode;
  columns?: number | string;
  gap?: string;
}

export default function MasonryGrid({
  children,
  columns = 3,
  gap = 'var(--space-4)'
}: MasonryGridProps) {
  // Ensure columns is a number
  const columnCount = typeof columns === 'string' ? parseInt(columns, 10) : columns;

  // Count actual children to auto-adjust columns
  const childrenArray = Children.toArray(children);
  const actualColumns = childrenArray.length < columnCount ? childrenArray.length : columnCount;

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${actualColumns}, 1fr)`,
    gap: gap,
    marginBottom: 'var(--space-8)',
    width: '100%',
    maxWidth: 'none',
  };

  return (
    <div style={gridStyle} className="masonry-grid">
      {children}
    </div>
  );
}

interface MasonryItemProps {
  children: React.ReactNode;
  span?: number;
}

export function MasonryItem({ children, span = 1 }: MasonryItemProps) {
  const itemStyle: CSSProperties = {
    gridColumn: `span ${span}`,
  };

  // Process children to wrap img tags with EnlargeableImage
  const processedChildren = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === 'img') {
      const imgProps = child.props as any;
      return (
        <EnlargeableImage
          src={imgProps.src}
          alt={imgProps.alt || ''}
        />
      );
    }
    return child;
  });

  return (
    <div style={itemStyle} className="masonry-item">
      {processedChildren}
    </div>
  );
}
