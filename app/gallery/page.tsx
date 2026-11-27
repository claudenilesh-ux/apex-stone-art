import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageIntro } from '@/components/uic-page-intro';
import { Gallery } from '@/components/uic-gallery';
import { galleryItems } from '@/config/gallery';
import { whatsappLink } from '@/config/business';

export const metadata: Metadata = { title: 'Gallery', description: 'Explore nine confirmed collections of stone artwork and architectural craftsmanship.' };
export default function GalleryPage() {
  const chat = whatsappLink('Hello Apex Stone Art, I would like to know more about your stone collection.');
  return <div className="editorial-page"><PageIntro index="03" label="The craft gallery" title="Nature." accent="In every detail." description="Explore carving details, sculptural forms and the character of natural stone."/><div className="shell section gallery-page">

    <Gallery items={galleryItems}/>
    <aside className="gallery-cta"><div><h2>Have a design in mind?</h2><p>Discuss your custom stone artwork requirements.</p></div>{chat ? <a className="button button-light" href={chat} target="_blank" rel="noopener noreferrer">Let's talk <ArrowUpRight size={18}/></a> : <Link className="button button-light" href="/contact/">Let's talk <ArrowUpRight size={18}/></Link>}</aside>
  </div></div>;
}
