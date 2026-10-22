import { siteConfig } from '../config/siteConfig';

/** Opens a WhatsApp chat, optionally pre-filled with the service the visitor asked about. */
export function openWhatsApp(topic?: string): void {
  const { whatsappNumber, whatsappMessage } = siteConfig.contact;
  const text = topic ? `${whatsappMessage}\n\nService: ${topic}` : whatsappMessage;
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
