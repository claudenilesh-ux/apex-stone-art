import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/config/business';
export function WhatsApp() { const url = whatsappLink('Hello Apex Stone Art, I would like to enquire about your products.'); return url ? <a className="floating-chat" href={url} target="_blank" rel="noopener noreferrer" aria-label="Chat with Apex Stone Art on WhatsApp"><MessageCircle size={26}/></a> : null; }
