import { siteLinks } from '../data/siteLinks';

const WHATSAPP_NUMBER = siteLinks.phonePrimary.replace(/\D/g, '');

/**
 * Opens WhatsApp with a pre-filled inquiry message to the site's primary helpline.
 * (Browser security requires the user to tap Send inside WhatsApp once the chat opens.)
 */
export function dispatchWhatsAppInquiry(payload) {
  const {
    type = 'booking',
    name,
    phone,
    email = '',
    destination = '',
    travelDate = '',
    guests = '',
    notes = '',
    preferredTime = '',
    lang = 'en',
  } = payload;

  const isHi = lang === 'hi';
  const header =
    type === 'contact'
      ? isHi
        ? '💬 *वीपा हॉलिडेज — वेबसाइट संदेश*'
        : '💬 *Vipa Holidays — Website Contact Message*'
      : type === 'callback'
        ? isHi
          ? '🔔 *वीपा हॉलिडेज — कॉलबैक अनुरोध*'
          : '🔔 *Vipa Holidays — Callback Request*'
        : isHi
          ? '📋 *वीपा हॉलिडेज — बुकिंग / कोटेशन अनुरोध*'
          : '📋 *Vipa Holidays — Booking / Quote Request*';

  const lines = [
    header,
    '',
    isHi ? `नाम: ${name}` : `Name: ${name}`,
    isHi ? `मोबाइल: ${phone}` : `Mobile: ${phone}`,
  ];

  if (email) {
    lines.push(isHi ? `ईमेल: ${email}` : `Email: ${email}`);
  }

  if (destination) {
    lines.push(isHi ? `गंतव्य / पैकेज: ${destination}` : `Destination / Package: ${destination}`);
  }
  if (travelDate) {
    lines.push(isHi ? `यात्रा तिथि: ${travelDate}` : `Travel date: ${travelDate}`);
  }
  if (guests) {
    lines.push(isHi ? `यात्री: ${guests}` : `Guests: ${guests}`);
  }
  if (preferredTime) {
    lines.push(isHi ? `कॉल का समय: ${preferredTime}` : `Preferred call time: ${preferredTime}`);
  }
  if (notes) {
    lines.push(isHi ? `विवरण: ${notes}` : `Details: ${notes}`);
  }

  lines.push('');
  lines.push(isHi ? 'कृपया सर्वोत्तम कस्टम कोटेशन भेजें। धन्यवाद!' : 'Please share the best custom quote. Thank you!');

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
