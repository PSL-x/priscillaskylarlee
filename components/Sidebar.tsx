'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

const workProjects = [
  { title: 'Data & Analytics Design System', slug: 'dna-designsystem' },
  { title: 'Consistency and Standardization', slug: 'consistency-standardization' },
];

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/playground', label: 'Playground' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const main = document.getElementById('main-content');
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (main) main.setAttribute('aria-hidden', 'true');
    } else {
      document.body.style.overflow = '';
      if (main) main.removeAttribute('aria-hidden');
    }

    return () => {
      document.body.style.overflow = '';
      if (main) main.removeAttribute('aria-hidden');
    };
  }, [isOpen]);

  const isActive = (href: string) => pathname === href;

  const isWorkPath = pathname.startsWith('/work/');
  const isPlaygroundSlug = pathname.startsWith('/playground/') && pathname !== '/playground/';

  const circularNav = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Playground', path: '/playground' },
    { name: 'Project - D&A Design System', path: '/work/dna-designsystem' },
    { name: 'Project - Consistency & Standardization', path: '/work/consistency-standardization' },
  ];

  const currentIndex = circularNav.findIndex(item => item.path === pathname);
  const prevItem = currentIndex >= 0 ? circularNav[(currentIndex - 1 + circularNav.length) % circularNav.length] : null;
  const nextItem = currentIndex >= 0 ? circularNav[(currentIndex + 1) % circularNav.length] : null;

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4rem',
          paddingBottom: 'env(safe-area-inset-bottom)',
          backgroundColor: 'var(--sidebar-bg)',
          borderTop: '0.0625rem solid var(--border)',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
          zIndex: 50
        }}
        className="mobile-bottom-nav"
        aria-label="Mobile navigation"
      >
        <div style={{ flex: 1, maxWidth: '40%', display: 'flex', justifyContent: 'flex-start' }}>
          {isPlaygroundSlug ? (
            <Link
              href="/playground"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                color: 'var(--muted)',
                textDecoration: 'none',
                fontSize: 'var(--text-sm)',
                minWidth: '44px',
                minHeight: '44px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
              aria-label="Back to Playground"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Playground
              </span>
            </Link>
          ) : prevItem && (
            <Link
              href={prevItem.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                color: 'var(--muted)',
                textDecoration: 'none',
                fontSize: 'var(--text-sm)',
                minWidth: '44px',
                minHeight: '44px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
              aria-label={`Previous: ${prevItem.name}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {prevItem.name}
              </span>
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--foreground)',
            cursor: 'pointer',
            flexShrink: 0
          }}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div style={{ flex: 1, maxWidth: '40%', display: 'flex', justifyContent: 'flex-end' }}>
          {nextItem && (
            <Link
              href={nextItem.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                color: 'var(--muted)',
                textDecoration: 'none',
                fontSize: 'var(--text-sm)',
                minWidth: '44px',
                minHeight: '44px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
              aria-label={`Next: ${nextItem.name}`}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {nextItem.name}
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'var(--background)',
              zIndex: 60,
              animation: 'fadeIn 0.2s ease-out',
              overflow: 'hidden',
              paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <div style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              height: '100%',
              overflowY: 'auto'
            }}>
              <div>
                <Link
                  href="/"
                  style={{
                    fontSize: 'var(--text-xl)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 400,
                    color: 'var(--foreground)'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Priscilla Skylar Lee
                </Link>
              </div>

              <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: isActive(link.href) ? 'var(--foreground)' : 'var(--muted)',
                        transition: 'color 0.2s',
                        paddingTop: 'var(--space-1)',
                        paddingBottom: 'var(--space-1)'
                      }}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div>
                  <h2 style={{
                    fontSize: 'var(--text-lg)',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginBottom: 'var(--space-2)',
                    letterSpacing: '0.04em',
                    fontWeight: 500,
                    opacity: 0.7
                  }}>
                    Projects
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                    {workProjects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/work/${project.slug}`}
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted)',
                          transition: 'color 0.2s',
                          paddingTop: 'var(--space-1)',
                          paddingBottom: 'var(--space-1)'
                        }}
                        onClick={() => setIsOpen(false)}
                      >
                        {project.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('priscillaskylarlee@gmail.com');
                      setShowCopiedToast(true);
                      setTimeout(() => setShowCopiedToast(false), 2000);
                    }}
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted)',
                      transition: 'color 0.2s',
                      paddingTop: 'var(--space-1)',
                      paddingBottom: 'var(--space-1)',
                      paddingLeft: 0,
                      paddingRight: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-1)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      fontFamily: 'inherit',
                      position: 'relative',
                      minHeight: '2rem',
                    }}
                  >
                    Email Me
                    <span style={{ display: 'inline-flex' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                      </svg>
                    </span>
                    {showCopiedToast && (
                      <span
                        style={{
                          position: 'absolute',
                          left: '7rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'var(--foreground)',
                          color: 'var(--background)',
                          padding: 'var(--space-1) var(--space-2)',
                          borderRadius: '0.25rem',
                          fontSize: 'var(--text-xs)',
                          whiteSpace: 'nowrap',
                          zIndex: 100,
                          animation: 'fadeInPlace 0.2s ease-out'
                        }}
                        role="status"
                        aria-live="polite"
                      >
                        Email copied to clipboard
                        <span
                          style={{
                            position: 'absolute',
                            left: '-0.25rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 0,
                            height: 0,
                            borderTop: '0.25rem solid transparent',
                            borderBottom: '0.25rem solid transparent',
                            borderRight: '0.25rem solid var(--foreground)'
                          }}
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div style={{ paddingTop: 'var(--space-3)', position: 'relative' }} className="wavy-line-container">
                <svg
                  width="100%"
                  height="6"
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0.3 }}
                  className="wavy-line"
                >
                  <path
                    d="M0,3 Q2.5,0 5,3 T10,3 T15,3 T20,3 T25,3 T30,3 T35,3 T40,3 T45,3 T50,3 T55,3 T60,3 T65,3 T70,3 T75,3 T80,3 T85,3 T90,3 T95,3 T100,3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
                <div style={{ border: '0.0625rem solid var(--border)', borderRadius: '0.375rem' }}>
                  <button
                    onClick={toggleTheme}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      width: '100%',
                      padding: 'var(--space-2)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '0.375rem',
                      color: 'var(--muted)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  >
                    <svg
                      style={{ width: '1rem', height: '1rem' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {theme === 'dark' ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      )}
                    </svg>
                    <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <nav
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4rem',
              paddingBottom: 'env(safe-area-inset-bottom)',
              backgroundColor: 'var(--sidebar-bg)',
              borderTop: '0.0625rem solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 61
            }}
            aria-label="Close menu navigation"
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--foreground)',
                cursor: 'pointer'
              }}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </nav>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '16.25rem',
          flexShrink: 0,
          backgroundColor: 'var(--sidebar-bg)',
          borderRight: '0.0625rem solid var(--border)',
          flexDirection: 'column',
          padding: '2rem',
          zIndex: 40,
        }}
        className="sidebar"
        aria-label="Main navigation"
      >
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <Link
            href="/"
            style={{
              fontSize: 'var(--text-lg)',
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              color: 'var(--foreground)',
              letterSpacing: '-0.01em'
            }}
          >
            Priscilla Skylar Lee
          </Link>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }} aria-label="Main">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 'var(--text-sm)',
                  color: isActive(link.href) ? 'var(--foreground)' : 'var(--muted)',
                  transition: 'color 0.2s',
                  paddingTop: 'var(--space-1)',
                  paddingBottom: 'var(--space-1)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) e.currentTarget.style.color = 'var(--foreground)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) e.currentTarget.style.color = 'var(--muted)';
                }}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h2 style={{
              fontSize: 'var(--text-lg)',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 'var(--space-2)',
              letterSpacing: '0.1em',
              fontWeight: 500,
              opacity: 0.7
            }}>
              Projects
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {workProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted)',
                    transition: 'color 0.2s',
                    paddingTop: 'var(--space-1)',
                    paddingBottom: 'var(--space-1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                >
                  {project.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div style={{ marginTop: 'var(--space-6)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <button
              onClick={() => {
                navigator.clipboard.writeText('priscillaskylarlee@gmail.com');
                setShowCopiedToast(true);
                setTimeout(() => setShowCopiedToast(false), 2000);
              }}
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--muted)',
                transition: 'color 0.2s',
                paddingTop: 'var(--space-1)',
                paddingBottom: 'var(--space-1)',
                paddingLeft: 0,
                paddingRight: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
            >
              Email Me
              <span style={{ position: 'relative', display: 'inline-flex' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
                {showCopiedToast && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 'calc(100% + 0.75rem)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'var(--foreground)',
                      color: 'var(--background)',
                      padding: 'var(--space-1) var(--space-2)',
                      borderRadius: '0.25rem',
                      fontSize: 'var(--text-xs)',
                      whiteSpace: 'nowrap',
                      zIndex: 100,
                      animation: 'fadeInPlace 0.2s ease-out'
                    }}
                    role="status"
                    aria-live="polite"
                  >
                    Email copied to clipboard
                    <span
                      style={{
                        position: 'absolute',
                        left: '-0.25rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 0,
                        height: 0,
                        borderTop: '0.25rem solid transparent',
                        borderBottom: '0.25rem solid transparent',
                        borderRight: '0.25rem solid var(--foreground)'
                      }}
                      aria-hidden="true"
                    />
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)', position: 'relative' }} className="wavy-line-container">
          <svg
            width="100%"
            height="6"
            viewBox="0 0 100 6"
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0.3 }}
            className="wavy-line"
          >
            <path
              d="M0,3 Q2.5,0 5,3 T10,3 T15,3 T20,3 T25,3 T30,3 T35,3 T40,3 T45,3 T50,3 T55,3 T60,3 T65,3 T70,3 T75,3 T80,3 T85,3 T90,3 T95,3 T100,3"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <div style={{ border: '0.0625rem solid var(--border)', borderRadius: '0.375rem' }}>
            <button
              onClick={toggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                width: '100%',
                padding: 'var(--space-2)',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '0.375rem',
                color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <svg
                style={{ width: '1rem', height: '1rem' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {theme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
              <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
            </button>
          </div>
        </div>
      </aside>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: flex !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
