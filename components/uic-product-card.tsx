import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import type { Product } from '@/config/products';
import type { GalleryCollection } from '@/config/gallery';
import { whatsappLink } from '@/config/business';
export function StoneVisual({ product }: { product: Product }) {
  return <div className={`stone-visual texture-${product.texture}`}>{product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 100vw, 33vw"/> : <span className="sample-label">Texture preview</span>}</div>;
}
export function ProductCard({ product, sample = false, collection }: { product: Product; sample?: boolean; collection: GalleryCollection }) {
  const url = whatsappLink(sample ? `Hello Apex Stone Art, I am interested in ${collection}. Do you offer designs similar to ${product.name}?` : `Hello Apex Stone Art, I would like a quotation for ${product.name} (${collection}).`);
  return <article className="product-card" data-reveal><StoneVisual product={product}/>{sample && <span className="editorial-product-sample">Design concept</span>}<div className="product-body"><span className="eyebrow">{collection}</span><h3>{product.name}</h3><p>{product.description}</p>{url ? <a className="text-link" href={url} target="_blank" rel="noopener noreferrer">{sample ? "Ask about this design" : "Ask on WhatsApp"} <ArrowUpRight size={17}/></a> : <Link className="text-link" href={`/contact/?product=${encodeURIComponent(collection)}`}>Request a quote <ArrowUpRight size={17}/></Link>}</div></article>;
}

export function PendingCollectionCard({ collection }: { collection: GalleryCollection }) {
  const url = whatsappLink(`Hello Apex Stone Art, I would like a quotation for ${collection}.`);
  return <article className="product-card" data-reveal><div className="gallery-pending-media stone-visual"><ImageIcon size={28} strokeWidth={1.5} aria-hidden="true"/><span>Photos coming soon</span></div><div className="product-body"><h3>{collection}</h3><p>Contact us to discuss available designs.</p>{url ? <a className="text-link" href={url} target="_blank" rel="noopener noreferrer">Ask on WhatsApp <ArrowUpRight size={17}/></a> : <Link className="text-link" href={`/contact/?product=${encodeURIComponent(collection)}`}>Request a quote <ArrowUpRight size={17}/></Link>}</div></article>;
}
