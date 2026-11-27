import type { ReactNode } from 'react';
import Image from 'next/image';

export function PageIntro({ index, label, title, accent, description, image, sample = false, children }: { index: string; label: string; title: string; accent: string; description: string; image?: string; sample?: boolean; children?: ReactNode }) {
  return <header className="editorial-page-intro">
    {image && <div className="editorial-page-image"><Image src={image} alt="" fill sizes="(max-width: 700px) 100vw, 45vw"/></div>}
    <div className="editorial-page-copy"><p className="eyebrow hero-enter hero-step-1"><span className="editorial-dot"/>{index} / {label}</p><h1 className="hero-enter hero-step-2">{title}<br/><span>{accent}</span></h1><p className="hero-enter hero-step-3">{description}</p>{children}</div>
    {sample && image && <span className="editorial-page-caption">Craft design concept</span>}
  </header>;
}
