import type { Metadata } from "next";
import type { ReactNode } from "react";
import { business } from "@/config/business";
import { Navbar } from "@/components/uic-navbar";
import { Footer } from "@/components/uic-footer";
import { ScrollReveal } from "@/components/uic-scroll-reveal";
import { WhatsApp } from "@/components/uic-whatsapp";
import "@/styles/globals.css";
export const metadata: Metadata = {
  title: {
    default: `${business.name} | Stone craftsmanship`,
    template: `%s | ${business.name}`,
  },
  description: business.description,
  robots: business.ready
    ? { index: true, follow: true }
    : { index: false, follow: false },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {!business.ready}
        <Navbar />
        <main id="main">{children}</main>
        <ScrollReveal />
        <Footer />
        <WhatsApp />
      </body>
    </html>
  );
}
