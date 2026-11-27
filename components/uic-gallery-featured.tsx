'use client';
import { useRef, useState, type TouchEvent } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { GalleryItem } from '@/config/gallery';
import { GalleryVisual } from './uic-gallery-visual';

export function FeaturedGallery({ items, onOpen }: { items: GalleryItem[]; onOpen: (id: string) => void }) {
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  if (!items.length) return null;
  const item = items[index % items.length];
  const move = (delta: number) => setIndex(i => (i + delta + items.length) % items.length);
  const start = (e: TouchEvent) => { const t = e.touches[0]; touch.current = e.touches.length === 1 ? { x: t.clientX, y: t.clientY } : null; };
  const end = (e: TouchEvent) => { const s = touch.current, t = e.changedTouches[0]; touch.current = null; if (!s || !t) return; const x = t.clientX - s.x, y = t.clientY - s.y; if (Math.abs(x) > 50 && Math.abs(x) > Math.abs(y) * 1.5) move(x < 0 ? 1 : -1); };
  return <section className="gallery-feature-section" aria-label="Featured stone artwork" aria-roledescription="carousel">
    <div className="gallery-feature" onTouchStart={start} onTouchEnd={end} onTouchCancel={() => { touch.current = null; }}>
      <div className="gallery-feature-media gallery-crossfade" key={item.id}><GalleryVisual item={item} priority={index === 0}/></div>
      <span className="gallery-slide-count" aria-hidden="true">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
      <div className="gallery-feature-copy gallery-copy-enter" key={`copy-${item.id}`}>
        <p className="gallery-feature-tag">Featured artwork</p><h2>{item.name}</h2><p>{item.description}</p>
        <button type="button" className="button button-light" onClick={() => onOpen(item.id)}>Explore artwork <ArrowUpRight size={18}/></button>
      </div>
      {items.length > 1 && <div className="gallery-feature-arrows"><button type="button" aria-label="Previous featured artwork" onClick={() => move(-1)}><ArrowLeft size={21}/></button><button type="button" aria-label="Next featured artwork" onClick={() => move(1)}><ArrowRight size={21}/></button></div>}
      <span className="gallery-sr-only" aria-live="polite">Featured artwork {index + 1} of {items.length}: {item.name}</span>
    </div>
    {items.length > 1 && <div className="gallery-progress" aria-label="Choose featured artwork">{items.map((entry, i) => <button key={entry.id} type="button" aria-label={`Show ${entry.name}`} aria-pressed={i === index} onClick={() => setIndex(i)}><span/></button>)}</div>}
  </section>;
}
