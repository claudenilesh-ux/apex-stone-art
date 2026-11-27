import Link from 'next/link';
import { ArrowUpRight, Blocks, Hammer, Quote, Sparkles } from 'lucide-react';
import { Hero } from '@/components/uic-hero';
import { CraftShowcase } from '@/components/uic-craft-showcase';
import { craftItems } from '@/config/craft';

const steps = [
  { icon: Blocks, title: 'Select', description: 'Begin with the character of natural stone.' },
  { icon: Hammer, title: 'Carve', description: 'Shape and refine the material into a design.' },
  { icon: Sparkles, title: 'Finish', description: 'Reveal the detail, texture and final form.' },
];
export default function Home() {
  return <>
    <Hero/>
    <section className="craft-intro-band" aria-labelledby="craft-intro-title">
      <div className="shell section craft-intro">
        <div className="craft-intro-heading" data-reveal>
          <p className="eyebrow">Beyond the material</p>
          <h2 id="craft-intro-title">Every detail.<br/><span>A human touch.</span></h2>
        </div>
        <div className="craft-intro-panel" data-reveal>
          <Quote size={28} strokeWidth={1.5} aria-hidden="true"/>
          <p className="lead">Stone is more than a raw material. In the hands of a skilled artisan, it becomes an expression of creativity, patience and precision.</p>
        </div>
      </div>
    </section>
    <CraftShowcase items={craftItems}/>
    <section className="shell section craft-process" aria-labelledby="craft-process-title"><div data-reveal><p className="eyebrow">The making of stone art</p><h2 id="craft-process-title">From stone to art.</h2></div><div className="craft-process-grid">{steps.map(({ icon: Icon, title, description }, i) => <article key={title} data-reveal><Icon size={28} strokeWidth={1.6} aria-hidden="true"/><h3>{String(i + 1).padStart(2, '0')}. {title}</h3><p>{description}</p></article>)}</div></section>
    <section className="shell section project-cta" aria-labelledby="project-title"><div className="cta-panel" data-reveal><div className="cta-inner"><div><p className="eyebrow">Your next creation</p><h2 id="project-title">Your vision.<br/>Carved in stone.</h2></div><Link href="/contact/" className="button button-light">Start a conversation <ArrowUpRight size={18} aria-hidden="true"/></Link></div></div></section>
  </>;
}
