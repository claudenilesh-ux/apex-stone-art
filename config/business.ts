export const business = {
  name: "Apex Stone Art",
  shortName: "APEX",
  tagline: "From natural stone to handcrafted art.",
  description:
    "Explore the art of stone carving, natural textures and distinctive handcrafted designs.",
  domain: "https://apexstoneart.com",
  phone: "+91 9784901986", // User-provided contact number.
  whatsapp: "919784901986", // International digits only, without + or spaces.
  email: "",
  address: "",
  previewContact: {
    email: "enquiry@apexstoneart.com",
    address:
      "Address: Apex stone art, NH 62, sirohi road, near pathik hotel, Pindwara, Rajasthan 307022",
  }, // Display-only placeholders; never used for email delivery or map links.
  mapUrl: "", // Approved public Google Maps URL.
  heroImage: "", // e.g. /images/hero.webp
  ready: process.env.NEXT_PUBLIC_SITE_READY === "true",
} as const;
export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/products/", label: "Products" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/contact/", label: "Contact" },
] as const;
export function whatsappLink(message: string) {
  return /^\d{8,15}$/.test(business.whatsapp)
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`
    : null;
}
