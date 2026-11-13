// ---------------------------------------------------------------------------
// LEMOSINE — WhatsApp helpers
// ---------------------------------------------------------------------------

export function normalizeWhatsAppNumber(number) {
  return String(number || '').replace(/[^\d]/g, '');
}

export function buildWhatsAppLink(number, message) {
  const digits = normalizeWhatsAppNumber(number);
  if (!digits) return '#';
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
