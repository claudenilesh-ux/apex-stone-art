import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Blocks, Hammer, Sparkles } from 'lucide-react';
import { business } from '@/config/business';
import { craftHeroImage, craftItems } from '@/config/craft';
import { PageIntro } from '@/components/uic-page-intro';
export const metadata: Metadata = { title: 'About' };
const steps = [{ icon: Blocks, title: 'Select', description: 'Begin with the natural character of stone.' }, { icon: Hammer, title: 'Carve', description: 'Shape and refine the material into a design.' }, { icon: Sparkles, title: 'Finish', description: 'Reveal the texture, detail and final form.' }];
export default function About() {
  const detail = craftItems.find(item => item.id === 'craft-floral') ?? craftItems[0];
  return <div className="editorial-page"><PageIntro index="01" label="About the craft" title="Rooted in nature." accent="Shaped by skill." description={business.description} image={craftHeroImage || undefined} sample={!business.ready && !business.heroImage}/>
    <section className="shell section editorial about-story" data-reveal><div><p className="eyebrow">Beyond the material</p><h2>Every detail.<br/>A human touch.</h2><p className="lead">Explore carved motifs, sculptural forms and distinctive stone details.</p><p>Share your design requirements to discuss available materials and finishes.</p>{!business.ready && <p className="notice">Draft introduction. Company history, capabilities and credentials are awaiting confirmation.</p>}<Link className="text-link" href="/contact/">Get in touch <ArrowUpRight size={17}/></Link></div>{detail && <figure className="editorial-detail-image"><Image src={detail.image} alt={detail.name} fill sizes="(max-width: 700px) 100vw, 50vw"/>{detail.sample && <figcaption className="sample-label">Craft design concept</figcaption>}</figure>}</section>
    <section className="shell section craft-process"><p className="eyebrow">The making of stone art</p><h2>From stone to art.</h2><div className="craft-process-grid">{steps.map(({icon: Icon,title,description},i)=><article key={title} data-reveal><Icon size={28} strokeWidth={1.6}/><h3>{String(i+1).padStart(2,'0')}. {title}</h3><p>{description}</p></article>)}</div></section>
  </div>;
}
