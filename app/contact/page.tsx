import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, whatsappLink } from "@/config/business";
import { PageIntro } from "@/components/uic-page-intro";
import { ContactForm } from "@/components/uic-contact-form";

export const metadata: Metadata = { title: "Contact" };

function DirectContactLinks() {
  const chat = whatsappLink("Hello Apex Stone Art, I would like a quotation.");
  const formatPhone = (phone: string) =>
    phone.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2 $3");
  const phoneLabel = formatPhone(business.phone);
  const whatsappLabel = formatPhone(`+${business.whatsapp}`);
  return (
    <div className="contact-action-grid">
      {business.phone && (
        <a
          className="contact-method contact-method-call"
          href={`tel:${business.phone}`}
        >
          <Phone aria-hidden="true" />
          <span className="contact-method-copy">
            <strong>Call us</strong>
            <span>{phoneLabel}</span>
          </span>
          <ArrowUpRight className="contact-method-arrow" aria-hidden="true" />
        </a>
      )}
      {chat && (
        <a
          className="contact-method contact-method-whatsapp"
          href={chat}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle aria-hidden="true" />
          <span className="contact-method-copy">
            <strong>WhatsApp</strong>
            <span>{whatsappLabel}</span>
          </span>
          <ArrowUpRight className="contact-method-arrow" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <div className="editorial-page">
      <PageIntro
        index="04"
        label="Contact"
        title="Your vision."
        accent="Carved in stone."
        description="Tell us about your idea, ask for a quotation or speak with us directly."
      />
      <section className="shell section contact-page">
        <div className="contact-grid">
          <div className="contact-intro hero-enter hero-step-1">
            <p className="eyebrow contact-eyebrow">Contact us</p>
            <h2 className="contact-title">
              Let’s talk about your <em>project.</em>
            </h2>
            <p className="lead">
              Need a quotation or help choosing the right stone? Share your
              requirements or speak with us directly.
            </p>
            <DirectContactLinks />
            <h2 className="contact-details-heading">Business details</h2>
            <div className="contact-info-grid">
              <div className="contact-method contact-method-outline">
                <Mail aria-hidden="true" />
                <span className="contact-method-copy">
                  <strong>Email us</strong>
                  {business.email ? (
                    <a href={`mailto:${business.email}`}>{business.email}</a>
                  ) : !business.ready ? (
                    <>
                      <span>{business.previewContact.email}</span>
                    </>
                  ) : (
                    <span>Email to be confirmed</span>
                  )}
                </span>
              </div>
              <div className="contact-method contact-method-outline">
                <MapPin aria-hidden="true" />
                <span className="contact-method-copy">
                  <strong>Visit our yard</strong>
                  <span>
                    {business.address ||
                      (!business.ready
                        ? business.previewContact.address
                        : "Address to be confirmed")}
                  </span>
                  {!business.address && !business.ready}
                  {business.mapUrl && business.address && (
                    <a
                      href={business.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open map
                    </a>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="contact-panel hero-enter hero-step-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
