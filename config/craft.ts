import { business } from './business';
import { galleryItems } from './gallery';
import type { GalleryItem } from './gallery';

// The homepage showcase uses the same confirmed collection images as Gallery.
export type CraftItem = GalleryItem;
export const craftItems = galleryItems;
export const craftHeroImage = business.heroImage || (!business.ready ? '/images/craft/artisan.webp' : '');
export const craftPhrases = ['handcrafted art.', 'timeless carvings.', 'intricate details.', 'lasting creations.'] as const;

// The artisan study is a process image, not a product or collection.
export const craftHeroScenes: { image: string; title: string; sample: boolean }[] = [
  ...(craftHeroImage ? [{ image: craftHeroImage, title: 'The art of hand carving', sample: !business.heroImage }] : []),
  ...galleryItems.filter(item => ['Stone Jali & Screens', 'Carved Panels & Murals'].includes(item.collection) && item.image !== craftHeroImage).filter((item, index, all) => all.findIndex(other => other.collection === item.collection) === index).map(item => ({ image: item.image, title: item.name, sample: item.sample })),
];
