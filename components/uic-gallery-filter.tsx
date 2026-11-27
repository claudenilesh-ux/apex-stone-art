import type { GalleryCollection } from '@/config/gallery';

type Selection = 'All' | GalleryCollection;
export function GalleryFilter({ categories, selected, onSelect }: { categories: readonly GalleryCollection[]; selected: Selection; onSelect: (category: Selection) => void }) {
  const options: Selection[] = ['All', ...categories];
  return <div className="gallery-filters" role="group" aria-label="Filter by collection">
    {options.map(category => <button key={category} type="button" aria-pressed={selected === category} onClick={() => onSelect(category)}>{category === 'All' ? 'All collections' : category}</button>)}
  </div>;
}
