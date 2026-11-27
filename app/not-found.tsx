import Link from 'next/link';
export default function NotFound() { return <section className="shell section"><p className="eyebrow">404</p><h1 className="page-title">Page not found.</h1><Link href="/" className="button button-dark">Back to home</Link></section>; }
