import { Shop } from '@/types';

/**
 * Extracts a clean phone number from WhatsApp URL or custom link
 */
export function extractPhoneFromShop(shop: Shop): string {
  // Check WhatsApp link first
  const waLink = shop.links.find((l) => l.type === 'whatsapp');
  if (waLink?.url) {
    const raw = waLink.url
      .replace(/^(https?:\/\/)?(wa\.me\/|api\.whatsapp\.com\/send\?phone=)/i, '')
      .split('?')[0];
    const digits = raw.replace(/\D/g, '');
    if (digits.length >= 10) {
      return digits.startsWith('+') ? digits : `+${digits}`;
    }
  }

  // Check buttonUrl if tel:
  if (shop.buttonUrl && shop.buttonUrl.startsWith('tel:')) {
    const raw = shop.buttonUrl.replace(/^tel:/i, '').trim();
    return raw.startsWith('+') ? raw : `+${raw}`;
  }

  return '';
}

/**
 * Generates and downloads a standardized vCard (.vcf) file
 * natively supported by iOS (Contacts / Apple Address Book) and Android (Google Contacts)
 */
export function downloadShopVCard(shop: Shop) {
  const phone = extractPhoneFromShop(shop);
  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/${shop.slug}`
      : `https://assudanideveloper-nfc.vercel.app/${shop.slug}`;

  const cleanName = shop.name.trim();
  const cleanCategory = shop.category?.trim() || 'Business';
  const cleanAddress = shop.address?.trim()?.replace(/[\r\n,]+/g, ' ') || '';
  const cleanTagline = shop.tagline?.trim()?.replace(/[\r\n]+/g, ' ') || '';

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${cleanName}`,
    `N:${cleanName};;;;`,
    `ORG:${cleanName}`,
    `TITLE:${cleanCategory}`,
    phone ? `TEL;TYPE=CELL,VOICE,PREF:${phone}` : '',
    `URL;TYPE=WORK:${currentUrl}`,
    cleanAddress ? `ADR;TYPE=WORK:;;${cleanAddress};;;;` : '',
    cleanTagline ? `NOTE:${cleanTagline} - Powered by TapTap NFC` : '',
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `${cleanName.replace(/[^a-zA-Z0-9]/g, '_')}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}

