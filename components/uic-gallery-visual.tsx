import Image from "next/image";
import type { GalleryItem } from "@/config/gallery";

export function GalleryVisual({
  item,
  priority = false,
}: {
  item: GalleryItem;
  priority?: boolean;
}) {
  return (
    <div className={`gallery-visual texture-${item.texture}`}>
      {item.image ? (
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 75vw, 1280px"
          priority={priority}
        />
      ) : (
        <span className="gallery-sample">Texture preview</span>
      )}
      {item.sample && (
        <span className="gallery-sample">Design concept</span>
      )}
    </div>
  );
}
