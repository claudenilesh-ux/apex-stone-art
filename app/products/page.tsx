import type { Metadata } from "next";
import {
  ProductCard,
  PendingCollectionCard,
} from "@/components/uic-product-card";
import { PageIntro } from "@/components/uic-page-intro";
import { galleryCollections, galleryItems } from "@/config/gallery";
export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore nine confirmed stone artwork and architectural craftsmanship collections.",
};
export default function Products() {
  const detail =
    galleryItems.find((item) => item.collection === "Stone Jali & Screens") ??
    galleryItems[0];
  return (
    <div className="editorial-page">
      <PageIntro
        index="02"
        label="The collection"
        title="Natural materials."
        accent="Distinctive forms."
        description="Explore carved details, stone artwork and decorative possibilities."
        image={detail?.image}
        sample={detail?.sample}
      />
      <section className="shell section editorial-products">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Craft collection</p>
            <h2>Art, carved in stone.</h2>
          </div>
          <span className="editorial-count">
            {String(galleryCollections.length).padStart(2, "0")} collections
          </span>
        </div>
        {galleryItems.some((item) => item.sample)}
        <div className="product-grid">
          {galleryCollections.flatMap((collection) => {
            const items = galleryItems.filter(
              (item) => item.collection === collection,
            );
            return items.length
              ? items.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    sample={item.sample}
                    collection={collection}
                  />
                ))
              : [
                  <PendingCollectionCard
                    key={collection}
                    collection={collection}
                  />,
                ];
          })}
        </div>
      </section>
    </div>
  );
}
