'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Progressive enhancement: content stays visible without JavaScript. */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    function configure() {
      observer?.disconnect();
      elements.forEach(element => element.classList.remove('reveal-enter'));
      if (motion.matches) return;

      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('reveal-enter');
          observer?.unobserve(entry.target);
        }
      }, { rootMargin: '0px 0px 32px 0px', threshold: 0 });

      for (const element of elements) {
        // Avoid replaying animations on content already visible at navigation.
        if (element.getBoundingClientRect().top >= window.innerHeight) {
          observer.observe(element);
        }
      }
    }

    configure();
    motion.addEventListener('change', configure);
    return () => {
      observer?.disconnect();
      motion.removeEventListener('change', configure);
      elements.forEach(element => element.classList.remove('reveal-enter'));
    };
  }, [pathname]);

  return null;
}
