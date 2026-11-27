'use client';
import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { GalleryItem } from '@/config/gallery';
import { GalleryVisual } from './uic-gallery-visual';

export function GalleryLightbox({ items, initialId, onClose }: { items: GalleryItem[]; initialId: string; onClose: () => void }) {
  const [index, setIndex] = useState(() => Math.max(0, items.findIndex(item => item.id === initialId)));
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const item = items[index];
  const move = (delta: number) => setIndex(i => (i + delta + items.length) % items.length);
  useEffect(() => {
    const element = dialog.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!element) return;
    element.showModal(); closeButton.current?.focus();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { if (element.open) element.close(); document.body.style.overflow = oldOverflow; if (opener?.isConnected) opener.focus({ preventScroll: true }); };
  }, []);
  const start = (e: TouchEvent) => { const t = e.touches[0]; touch.current = e.touches.length === 1 ? { x: t.clientX, y: t.clientY } : null; };
  const end = (e: TouchEvent) => { const s = touch.current, t = e.changedTouches[0]; touch.current = null; if (!s || !t) return; const x = t.clientX - s.x, y = t.clientY - s.y; if (Math.abs(x) > 50 && Math.abs(x) > Math.abs(y) * 1.5) move(x < 0 ? 1 : -1); };
  return <dialog ref={dialog} className="gallery-lightbox" aria-label="Stone artwork image preview" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) { const b = e.currentTarget.getBoundingClientRect(); if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) onClose(); } }} onKeyDown={e => { if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } else if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } }}>
    <button ref={closeButton} type="button" className="gallery-lightbox-close" aria-label="Close image preview" onClick={onClose}><X size={23}/></button>
    <div className="gallery-lightbox-media" onTouchStart={start} onTouchEnd={end} onTouchCancel={() => { touch.current = null; }}><div className="gallery-crossfade" key={item.id}><GalleryVisual item={item}/></div></div>
    <div className="gallery-lightbox-info"><div aria-live="polite"><p className="eyebrow">{item.category}</p><h2>{item.name}</h2><p className="gallery-lightbox-description">{item.description}</p></div>
      {items.length > 1 && <div className="gallery-thumbnails" role="group" aria-label="Choose image">{items.map((entry, i) => <button key={entry.id} type="button" aria-label={`View ${entry.name}`} aria-pressed={i === index} onClick={() => setIndex(i)}><GalleryVisual item={entry}/></button>)}</div>}
      <div className="gallery-lightbox-controls"><button type="button" aria-label="Previous image" onClick={() => move(-1)} disabled={items.length < 2}><ArrowLeft size={19}/> Previous</button><span aria-live="polite">{index + 1} / {items.length}</span><button type="button" aria-label="Next image" onClick={() => move(1)} disabled={items.length < 2}>Next <ArrowRight size={19}/></button></div>
    </div>
  </dialog>;
}
