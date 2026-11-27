import { business } from './business';
import type { Product } from './products';

// Confirmed by the customer contact. Keep the order and names consistent.
export const galleryCollections = [
  'Stone Jali & Screens',
  'Carved Panels & Murals',
  'Sculptures & Statues',
  'Pillars & Columns',
  'Temples & Mandirs',
  'Jharokhas & Arches',
  'Stone Fountains',
  'Chhatris & Gazebos',
  'Garden Stone Art',
] as const;
export type GalleryCollection = typeof galleryCollections[number];
export type GalleryItem = Product & { collection: GalleryCollection; featured: boolean; image: string; sample: boolean };

// Customer-approved photos go here. Each photo has a unique id and exact collection name.
const approved: GalleryItem[] = [];
// Local AI-generated visual studies, not factory photographs.
const preview: GalleryItem[] = [
  { id: 'craft-jali', name: 'Hand-carved Jali', collection: 'Stone Jali & Screens', category: 'Geometric stonework', description: 'Interlocking geometric patterns in carved stone.', texture: 'sand', image: '/images/craft/jali.webp', featured: true, sample: true },
  { id: 'craft-floral', name: 'Decorative carvings', collection: 'Carved Panels & Murals', category: 'Floral relief', description: 'Floral motifs, flowing leaves and sculpted details.', texture: 'marble', image: '/images/craft/floral.webp', featured: true, sample: true },
  { id: 'craft-lotus', name: 'Lotus medallions', collection: 'Carved Panels & Murals', category: 'Stone ornament', description: 'A circular lotus motif with a finely detailed border.', texture: 'clay', image: '/images/craft/lotus.webp', featured: true, sample: true },
  { id: 'craft-peacock', name: 'Peacock sculpture', collection: 'Sculptures & Statues', category: 'Sculptural art', description: 'A peacock study with finely carved feather details.', texture: 'sand', image: '/images/craft/peacock.webp', featured: true, sample: true },
  { id: 'craft-pillar', name: 'Ornamental pillar', collection: 'Pillars & Columns', category: 'Ornamental stone', description: 'An ornate pillar capital with carved botanical details.', texture: 'clay', image: '/images/craft/pillar.webp', featured: true, sample: true },
];
// Additional AI-generated artwork studies, displayed only in design preview.
const additionalPreview: GalleryItem[] = [
  { id: "temple-01", name: "Carved stone mandir", collection: "Temples & Mandirs", category: "Traditional stonework", description: "A carved shrine design with ornamental columns and relief details.", texture: "sand", image: "/images/collections/temples/temple-01.webp", featured: false, sample: true },
  { id: "jharokha-01", name: "Carved sandstone jharokha", collection: "Jharokhas & Arches", category: "Heritage stonework", description: "An ornamental window with carved arches and lattice details.", texture: "sand", image: "/images/collections/jharokhas/jharokha-01.webp", featured: false, sample: true },
  { id: "fountain-01", name: "Tiered stone fountain", collection: "Stone Fountains", category: "Water features", description: "A sculpted tiered fountain with lotus-shaped basins.", texture: "sand", image: "/images/collections/fountains/fountain-01.webp", featured: false, sample: true },
  { id: "chhatri-01", name: "Carved stone chhatri", collection: "Chhatris & Gazebos", category: "Stone pavilions", description: "A domed pavilion with ornamental pillars and arches.", texture: "sand", image: "/images/collections/chhatris/chhatri-01.webp", featured: false, sample: true },
  { id: "garden-01", name: "Carved planter and bench", collection: "Garden Stone Art", category: "Garden ornaments", description: "Decorative stone planter and bench with floral carvings.", texture: "sand", image: "/images/collections/garden-art/garden-01.webp", featured: false, sample: true },
  { id: "garden-02", name: "Stone lantern and lotus bowl", collection: "Garden Stone Art", category: "Garden ornaments", description: "Carved garden lantern and lotus-shaped stone bowl.", texture: "sand", image: "/images/collections/garden-art/garden-02.webp", featured: false, sample: true },
];
export const galleryItems: GalleryItem[] = [
  ...approved.filter(item => !item.sample),
  ...(!business.ready ? [...preview, ...additionalPreview] : []),
].filter(item => galleryCollections.includes(item.collection) && Boolean(item.image));
