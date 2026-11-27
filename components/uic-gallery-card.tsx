import { ArrowUpRight, Maximize } from 'lucide-react';
import type { GalleryItem } from '@/config/gallery';
import { GalleryVisual } from './uic-gallery-visual';

export function GalleryCard({ item, title = item.name, subtitle = item.category, onOpen }: { item: GalleryItem; title?: string; subtitle?: string; onOpen: (id: string) => void }) {
  return <button type="button" className="gallery-tile" aria-label={`View ${title}`} onClick={() => onOpen(item.id)}>
    <div className="gallery-tile-media"><GalleryVisual item={item}/><span className="gallery-expand"><Maximize size={19} aria-hidden="true"/></span></div>
    <div className="gallery-tile-info"><span><span className="gallery-tile-name">{title}</span><span className="gallery-tile-category">{subtitle}</span></span><ArrowUpRight size={21} aria-hidden="true"/></div>
  </button>;
}
