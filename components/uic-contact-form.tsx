'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { galleryCollections } from '@/config/gallery';
import { business } from '@/config/business';

const enquiryProducts: readonly string[] = galleryCollections;

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '';
const enabled = business.ready && Boolean(accessKey);

export function ContactForm() {
  const [product, setProduct] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('product');
    if (value && enquiryProducts.includes(value)) setProduct(value);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('botcheck')) return;
    data.set('access_key', accessKey);
    data.set('subject', 'New website enquiry - Apex Stone Art');
    setStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, signal: AbortSignal.timeout(15000) });
      const result: { success?: boolean } = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Submission failed');
      form.reset();
      setProduct('');
      setStatus('success');
    } catch { setStatus('error'); }
  }

  return (
    <form className="contact-form" onSubmit={submit} aria-labelledby="quotation-title">
      <header className="contact-form-header">
        <p className="eyebrow">Get a quotation</p>
        <h2 id="quotation-title">Send an enquiry</h2>
        <p>Tell us a little about what you need.</p>
      </header>
      {!enabled && <p className="notice contact-preview-note" role="status">Preview only — email enquiries are not connected yet. Call or WhatsApp us directly.</p>}
      <div className="form-grid">
        <label htmlFor="enquiry-name">
          <span className="contact-field-label">Full name <span aria-hidden="true">*</span></span>
          <input id="enquiry-name" name="name" autoComplete="name" placeholder="Enter your name" required maxLength={120} />
        </label>
        <label htmlFor="enquiry-email">
          <span className="contact-field-label">Email <span aria-hidden="true">*</span></span>
          <input id="enquiry-email" name="email" type="email" autoComplete="email" placeholder="Enter your email" required maxLength={254} />
        </label>
        <label htmlFor="enquiry-phone">
          <span className="contact-field-label">Phone <span aria-hidden="true">*</span></span>
          <input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" placeholder="Enter your phone number" required maxLength={30} />
        </label>
        <label htmlFor="enquiry-product">
          <span className="contact-field-label">Interested collection <span aria-hidden="true">*</span></span>
          <select id="enquiry-product" name="product" value={product} onChange={e => setProduct(e.target.value)} required>
            <option value="">Select a collection</option>
            {enquiryProducts.map(name => <option key={name} value={name}>{name}</option>)}
            <option>Other / not sure</option>
          </select>
        </label>
      </div>
      <label htmlFor="enquiry-message">
        <span className="contact-field-label">Project requirements <span aria-hidden="true">*</span></span>
        <textarea id="enquiry-message" name="message" required minLength={10} maxLength={3000} rows={4} placeholder="Tell us about your project (area, quantity, finish, location, etc.)" />
      </label>
      <div hidden aria-hidden="true"><label>Leave empty<input type="checkbox" name="botcheck" tabIndex={-1} /></label></div>
      <label className="consent"><input type="checkbox" name="consent" required /> <span>I agree to be contacted about this enquiry.</span></label>
      <button type="submit" className="button contact-submit" disabled={!enabled || status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={18} aria-hidden="true" />
      </button>
      <div className="contact-form-feedback" aria-live="polite">
        {status === 'success' && <p className="notice success">Your enquiry was submitted successfully.</p>}
        {status === 'error' && <p className="notice error">We could not confirm delivery. Please try again or use a direct contact option.</p>}
      </div>
    </form>
  );
}
