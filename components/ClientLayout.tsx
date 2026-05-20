'use client';

import { ThemeProvider } from './ThemeProvider';
import Sidebar from './Sidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen" style={{ background: 'var(--sidebar-bg)' }}>
        <Sidebar />
        <main id="main-content" className="main-content" style={{ padding: 'var(--space-3)' }}>
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
