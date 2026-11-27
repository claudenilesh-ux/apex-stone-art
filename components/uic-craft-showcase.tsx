'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import type { CraftItem } from '@/config/craft';

export function CraftShowcase({ items }: { items: CraftItem[] }) {
  const [paused, setPaused] = useState(false);
  if (!items.length) return <section id="collection" className="shell section"><h2>Explore the craft.</h2><p className="lead">Contact us to discuss available designs.</p><Link href="/contact/" className="button button-dark">Get in touch <ArrowUpRight size={18}/></Link></section>;
  // Repeat short lists enough to cover a wide viewport; second group is a seamless visual duplicate.
  const trackItems = Array.from({ length: Math.max(1, Math.ceil(6 / items.length)) }, () => items).flat();
  const renderGroup = (duplicate: boolean) => <div className="craft-track-group" aria-hidden={duplicate || undefined}>{trackItems.map((item, index) => <article key={`${item.id}-${index}`} className="craft-showcase-card" aria-hidden={index >= items.length || undefined}>
    <div className="craft-showcase-image"><Image src={item.image} alt={duplicate || index >= items.length ? '' : item.name} fill sizes="(max-width: 600px) 220px, 300px"/></div>
    <div className="craft-showcase-label"><h3>{item.name}</h3><span>{String(index % items.length + 1).padStart(2, '0')}</span></div><p>{item.category}</p>
  </article>)}</div>;
  return <section id="collection" className={`craft-showcase ${paused ? 'motion-paused' : ''}`} aria-labelledby="craft-collection-title">
    <div className="shell craft-showcase-heading" data-reveal><div><p className="eyebrow">The craft collection</p><h2 id="craft-collection-title">Art, carved in stone.</h2><p>Explore form, detail and the character of carved stone.</p></div><Link href="/gallery/" className="craft-gallery-link">View gallery <ArrowUpRight size={18}/></Link></div>
    <div className="craft-marquee" tabIndex={0} aria-label="Stone artwork showcase; focus to pause"><div className="craft-track">{renderGroup(false)}{renderGroup(true)}</div></div>
    <div className="shell craft-showcase-controls"><span>{items.some(item => item.sample) ? 'Design concepts · Availability on request' : 'Explore the collection'}</span><button type="button" className="craft-motion-button" aria-pressed={paused} onClick={() => setPaused(p => !p)}>{paused ? <Play size={15}/> : <Pause size={15}/>} {paused ? 'Play showcase' : 'Pause showcase'}</button></div>
  </section>;
}
