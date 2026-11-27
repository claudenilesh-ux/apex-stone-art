"use client";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import {
  galleryCollections,
  type GalleryItem,
  type GalleryCollection,
} from "@/config/gallery";
import { FeaturedGallery } from "./uic-gallery-featured";
import { GalleryFilter } from "./uic-gallery-filter";
import { GalleryCard } from "./uic-gallery-card";
import { GalleryLightbox } from "./uic-gallery-lightbox";

type Selection = "All" | GalleryCollection;

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<Selection>("All");
  const [preview, setPreview] = useState<{
    id: string;
    items: GalleryItem[];
  } | null>(null);
  const featured = items.filter((item) => item.featured);
  const categories = selected === "All" ? galleryCollections : [selected];
  const visible =
    selected === "All"
      ? items
      : items.filter((item) => item.collection === selected);
  return (
    <>
      <FeaturedGallery
        items={featured}
        onOpen={(id) => setPreview({ id, items: featured })}
      />
      <section
        className="gallery-collection"
        aria-labelledby="gallery-collection-title"
      >
        <div className="gallery-collection-heading">
          <div>
            <p className="eyebrow">The craft collection</p>
            <h2 id="gallery-collection-title">Explore the collection</h2>
            <p>Discover stone, up close.</p>
          </div>
          <span aria-live="polite">
            {selected === "All"
              ? `${galleryCollections.length} collections`
              : `${visible.length} ${visible.length === 1 ? "image" : "images"}`}
          </span>
        </div>
        <GalleryFilter
          categories={galleryCollections}
          selected={selected}
          onSelect={setSelected}
        />
        {items.some((item) => item.sample)}
        <div key={selected} className="gallery-tiles gallery-collections-grid">
          {categories.flatMap((collection) => {
            const photos = items.filter(
              (item) => item.collection === collection,
            );
            if (!photos.length)
              return [
                <article
                  key={collection}
                  className="gallery-tile gallery-collection-pending"
                >
                  <div className="gallery-tile-media gallery-pending-media">
                    <ImageIcon size={28} strokeWidth={1.5} aria-hidden="true" />
                    <span>Photos coming soon</span>
                  </div>
                  <div className="gallery-tile-info">
                    <span>
                      <span className="gallery-tile-name">{collection}</span>
                      <span className="gallery-tile-category">
                        Collection confirmed · photos pending
                      </span>
                    </span>
                  </div>
                </article>,
              ];
            if (selected === "All")
              return [
                <GalleryCard
                  key={collection}
                  item={photos[0]}
                  title={collection}
                  subtitle={`${photos.length} ${photos.every((p) => p.sample) ? (photos.length === 1 ? "design concept" : "design concepts") : photos.length === 1 ? "image" : "images"}`}
                  onOpen={(id) => setPreview({ id, items: photos })}
                />,
              ];
            return photos.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onOpen={(id) => setPreview({ id, items: photos })}
              />
            ));
          })}
        </div>
      </section>
      {preview && (
        <GalleryLightbox
          items={preview.items}
          initialId={preview.id}
          onClose={() => setPreview(null)}
        />
      )}
    </>
  );
}
