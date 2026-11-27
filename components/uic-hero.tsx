'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowDown, ArrowRight, Pause, Play } from 'lucide-react';
import { craftHeroScenes, craftPhrases } from '@/config/craft';
import { TypingText } from './uic-typing-text';
import { Navbar } from './uic-navbar';

export function Hero() {
  useEffect(() => { if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (paused || craftHeroScenes.length < 2) return;
    const timer = setTimeout(() => setIndex(i => (i + 1) % craftHeroScenes.length), 3000);
    return () => clearTimeout(timer);
  }, [index, paused]);
  const scene = craftHeroScenes[index];
  const next = craftHeroScenes[(index + 1) % craftHeroScenes.length];
  return <section className={`craft-hero editorial-hero ${paused ? 'motion-paused' : ''}`} aria-labelledby="hero-title">
    {scene && <div className="craft-hero-image" key={scene.image}><Image src={scene.image} alt="" fill priority={index === 0} sizes="(max-width: 700px) 100vw, 70vw"/></div>}
    <Navbar embedded/>
    <div className="editorial-hero-content">
      <p className="eyebrow hero-enter hero-step-1"><span className="editorial-dot"/>The art of stone</p>
      <h1 id="hero-title" className="hero-enter hero-step-2">Stone.<br/><span>Shaped by hand.</span></h1>
      <p className="editorial-type-line" aria-label="From natural stone to handcrafted art.">From natural stone to <TypingText phrases={craftPhrases} paused={paused}/></p>
      <p className="craft-hero-description hero-enter hero-step-3">Discover the beauty of stone carving, intricate details and the human skill behind every creation.</p>
      <div className="actions hero-enter hero-step-4"><a href="#collection" className="button editorial-primary">Explore our craft <ArrowDown size={18}/></a><Link href="/contact/" className="editorial-text-action">Discuss your design <ArrowUpRight size={17}/></Link></div>
    </div>
    {scene && next && craftHeroScenes.length > 1 && <button type="button" className="editorial-scene" onClick={() => setIndex(i => (i + 1) % craftHeroScenes.length)} aria-label={`Next craftsmanship scene: ${next.title}`}><span className="editorial-scene-image"><Image src={next.image} alt="" fill sizes="70px"/></span><span className="editorial-scene-copy"><small>Next scene · {String((index + 1) % craftHeroScenes.length + 1).padStart(2, '0')}</small><strong>{next.title}</strong></span><ArrowRight size={20}/></button>}
    <div className="editorial-hero-foot"><span>{scene?.sample ? 'Craft design concept' : 'Stone · Skill · Craftsmanship'}</span><a className="editorial-scroll" href="#collection">Scroll to explore <ArrowDown size={15}/></a><button type="button" className="craft-motion-button" aria-pressed={paused} onClick={() => setPaused(p => !p)}>{paused ? <Play size={15}/> : <Pause size={15}/>} {paused ? 'Play motion' : 'Pause motion'}</button></div>
  </section>;
}
