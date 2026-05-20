'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Set initial hidden state imperatively so React props don't override it
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 1.2s ease, transform 1.2s ease';

    const reveal = () => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';

        const onTransitionEnd = (e: TransitionEvent) => {
          if (e.propertyName !== 'transform') return;
          el.removeEventListener('transitionend', onTransitionEnd);
          el.style.removeProperty('transform');
          el.style.transition = 'transform 0.3s ease';
        };
        el.addEventListener('transitionend', onTransitionEnd);
      }, delay);
    };

    // If already in viewport on mount, reveal immediately without animation
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) {
      el.style.opacity = '1';
      el.style.removeProperty('transform');
      el.style.transition = 'transform 0.3s ease';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
