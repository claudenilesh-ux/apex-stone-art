'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { business, navigation } from '@/config/business';

export function Navbar({ embedded = false }: { embedded?: boolean }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (embedded) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      if (currentY <= 80) {
        setHidden(false);
        lastY = currentY;
      } else if (Math.abs(currentY - lastY) >= 8) {
        setHidden(currentY > lastY);
        lastY = currentY;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [embedded]);
  const normalize = (s: string) => s.replace(/\/$/, '') || '/';
  if (!embedded && normalize(pathname) === '/') return null;
  return <header className={`header editorial-nav ${embedded ? 'editorial-nav-embedded' : ''} ${hidden && !open ? 'editorial-nav-hidden' : ''}`}>
    <div className="nav-inner">
      <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label={`${business.name} home`}>
        <span className="brand-symbol" aria-hidden="true"><svg width="29" height="29" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 27 16 3 30 27H2Z M9 27l7-12 7 12 M12 10l11 17"/></svg></span>
        <span><b>{business.shortName}</b><small>STONE ART</small></span>
      </Link>
      <nav id="main-nav" aria-label="Main navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
        {navigation.map(n => <Link key={n.href} href={n.href} aria-current={normalize(pathname) === normalize(n.href) ? 'page' : undefined} onClick={() => setOpen(false)}>{n.label}</Link>)}
      </nav>
      <div className="editorial-nav-actions">
        <Link href="/contact/" className="button nav-cta" onClick={() => setOpen(false)}>Get a quote <ArrowUpRight size={16}/></Link>
        <button type="button" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(v => !v)}>{open ? <X size={21}/> : <Menu size={21}/>}</button>
      </div>
    </div>
  </header>;
}
