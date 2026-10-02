import { translations } from '../data/translations';
import { packagesData } from '../data/packagesData';
import { siteLinks } from '../data/siteLinks';
import { chatbotContent } from '../data/chatbotContent';
import { dispatchWhatsAppInquiry } from './whatsappInquiry';

const BOOKING_STEPS = ['name', 'phone', 'destination', 'travelDate', 'guests', 'notes'];
const CALLBACK_STEPS = ['name', 'phone', 'preferredTime', 'notes'];

function normalize(text) {
  return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

function tokenize(text) {
  return normalize(text).split(/[^a-z0-9\u0900-\u097F]+/).filter(Boolean);
}

function scoreOverlap(query, target) {
  const qTokens = new Set(tokenize(query));
  const tTokens = tokenize(target);
  if (!qTokens.size || !tTokens.length) return 0;
  let hits = 0;
  for (const t of tTokens) {
    if (qTokens.has(t) || [...qTokens].some((q) => t.includes(q) || q.includes(t))) hits += 1;
  }
  return hits / Math.max(tTokens.length, 1);
}

export function isValidPhone(input) {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 10) return true;
  if (digits.length >= 11 && digits.length <= 15) return true;
  return false;
}

function bestFaqMatch(query, lang) {
  const items = translations[lang]?.faq?.items || translations.en.faq.items;
  let best = { score: 0, item: null };
  for (const item of items) {
    const score = Math.max(scoreOverlap(query, item.q), scoreOverlap(query, item.a) * 0.9);
    if (score > best.score) best = { score, item };
  }
  return best.score >= 0.15 ? best.item : null;
}

function findPackages(query, lang) {
  const q = normalize(query);
  return packagesData
    .map((pkg) => {
      const title = pkg.title[lang];
      const loc = pkg.location[lang];
      const score = Math.max(scoreOverlap(q, title), scoreOverlap(q, loc), scoreOverlap(q, pkg.region));
      return { pkg, score };
    })
    .filter((x) => x.score >= 0.12)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

function detectIntent(text) {
  const q = normalize(text);
  if (/book|quote|booking|reserv|कोट|बुक|पैकेज बुक/.test(q)) return 'book';
  if (/callback|call back|call me|phone me|कॉल|कॉलबैक|फोन कर/.test(q)) return 'callback';
  if (/package|tour|trip|पैकेज|यात्रा|टूर/.test(q)) return 'packages';
  if (/service|cab|resort|houseboat|concierge|सेवा|कैब|हाउसबोट/.test(q)) return 'services';
  if (/contact|phone|email|address|hour|helpline|संपर्क|फोन|ईमेल|पता|समय/.test(q)) return 'contact';
  if (/cancel|refund|रद्द|धनवापसी/.test(q)) return 'cancellation';
  if (/custom|itinerary|बदल|कस्टम|शेड्यूल/.test(q)) return 'customize';
  if (/includ|meal|hotel|transfer|शामिल|होटल|भोजन/.test(q)) return 'inclusions';
  if (/emi|payment|pay|भुगतान|ईएमआई/.test(q)) return 'emi';
  if (/hello|hi|namaste|hey|नमस्ते|हेलो/.test(q)) return 'greet';
  if (/help|menu|options|मदद|सहायता/.test(q)) return 'help';
  return 'unknown';
}

function startFlow(type) {
  return {
    type,
    stepIndex: 0,
    data: {},
  };
}

function packagesReply(lang) {
  const c = chatbotContent[lang].prompts;
  const lines = packagesData.slice(0, 6).map((p) => `• ${p.title[lang]} (${p.durationDays}D/${p.durationNights}N)`);
  return `${c.packagesIntro}\n\n${lines.join('\n')}\n\n${lang === 'hi' ? 'कोटेशन के लिए "बुकिंग" टाइप करें या नीचे बटन दबाएं।' : 'Type "book" or tap Book below for a quote.'}`;
}

function servicesReply(lang) {
  const c = chatbotContent[lang].prompts;
  const items = translations[lang]?.services?.items || translations.en.services.items;
  const lines = items.map((s) => `• ${s.title}`);
  return `${c.servicesIntro}\n\n${lines.join('\n')}`;
}

function contactReply(lang) {
  const c = chatbotContent[lang].prompts;
  const info = translations[lang]?.contact?.info || translations.en.contact.info;
  return `${c.contactIntro}\n\n• ${info.phoneTitle}: ${info.phone}\n• ${info.emailTitle}: ${info.email}\n• ${info.addressTitle}: ${info.address}\n• ${info.hoursTitle}: ${info.hours}\n• WhatsApp: ${siteLinks.phonePrimary}`;
}

function knowledgeReply(text, lang) {
  const intent = detectIntent(text);
  const faqHit = bestFaqMatch(text, lang);

  if (faqHit && scoreOverlap(text, faqHit.q) >= 0.2) {
    return `**${faqHit.q}**\n\n${faqHit.a}`;
  }

  switch (intent) {
    case 'greet':
      return chatbotContent[lang].welcome;
    case 'help':
      return chatbotContent[lang].prompts.helpMenu;
    case 'packages': {
      const matched = findPackages(text, lang);
      if (matched.length) {
        const list = matched.map(({ pkg }) => `• ${pkg.title[lang]}`).join('\n');
        return `${chatbotContent[lang].prompts.packagesIntro}\n\n${list}`;
      }
      return packagesReply(lang);
    }
    case 'services':
      return servicesReply(lang);
    case 'contact':
      return contactReply(lang);
    case 'cancellation':
    case 'customize':
    case 'inclusions':
    case 'emi': {
      const map = {
        cancellation: lang === 'hi' ? 'रद्दीकरण' : 'cancellation',
        customize: lang === 'hi' ? 'कस्टम' : 'customize',
        inclusions: lang === 'hi' ? 'शामिल' : 'included',
        emi: 'EMI',
      };
      const item = translations[lang].faq.items.find((f) =>
        normalize(f.q).includes(normalize(map[intent]))
      );
      if (item) return `**${item.q}**\n\n${item.a}`;
      break;
    }
    default:
      break;
  }

  if (faqHit) return `**${faqHit.q}**\n\n${faqHit.a}`;

  const matched = findPackages(text, lang);
  if (matched.length) {
    const list = matched.map(({ pkg }) => `• ${pkg.title[lang]}`).join('\n');
    return `${chatbotContent[lang].prompts.packagesIntro}\n\n${list}`;
  }

  return chatbotContent[lang].prompts.fallback;
}

function stepPrompt(flow, lang) {
  const c = chatbotContent[lang].prompts;
  const steps = flow.type === 'callback' ? CALLBACK_STEPS : BOOKING_STEPS;
  const key = steps[flow.stepIndex];
  const map = {
    name: c.askName,
    phone: c.askPhone,
    destination: c.askDestination,
    travelDate: c.askDate,
    guests: c.askGuests,
    notes: c.askNotes,
    preferredTime: c.askCallTime,
  };
  return map[key];
}

function advanceFlow(flow, field, value, lang) {
  const steps = flow.type === 'callback' ? CALLBACK_STEPS : BOOKING_STEPS;
  const next = { ...flow, data: { ...flow.data, [field]: value } };
  next.stepIndex += 1;
  if (next.stepIndex >= steps.length) {
    dispatchWhatsAppInquiry({
      type: flow.type === 'callback' ? 'callback' : 'booking',
      name: next.data.name,
      phone: next.data.phone,
      destination: next.data.destination,
      travelDate: next.data.travelDate,
      guests: next.data.guests,
      notes: next.data.notes,
      preferredTime: next.data.preferredTime,
      lang,
    });
    const confirm =
      flow.type === 'callback' ? chatbotContent[lang].prompts.confirmCallback : chatbotContent[lang].prompts.confirmBooking;
    return { replies: [confirm], flow: null };
  }
  return { replies: [stepPrompt(next, lang)], flow: next };
}

/**
 * @returns {{ replies: string[], flow: object|null, quickActions?: boolean }}
 */
export function handleChatTurn({ text, lang, flow }) {
  const trimmed = text?.trim();
  if (!trimmed) return { replies: [], flow };

  if (trimmed === '__action__:book') {
    const f = startFlow('booking');
    return { replies: [chatbotContent[lang].prompts.askName], flow: f };
  }
  if (trimmed === '__action__:callback') {
    const f = startFlow('callback');
    return { replies: [chatbotContent[lang].prompts.askName], flow: f };
  }
  if (trimmed === '__action__:packages') {
    return { replies: [packagesReply(lang)], flow: null };
  }
  if (trimmed === '__action__:services') {
    return { replies: [servicesReply(lang)], flow: null };
  }
  if (trimmed === '__action__:contact') {
    return { replies: [contactReply(lang)], flow: null };
  }
  if (trimmed === '__action__:faq') {
    const item = translations[lang].faq.items.find((f) => normalize(f.q).includes('cancellation') || normalize(f.q).includes('रद्द'));
    return { replies: item ? [`**${item.q}**\n\n${item.a}`] : [knowledgeReply('cancellation', lang)], flow: null };
  }

  if (flow) {
    const steps = flow.type === 'callback' ? CALLBACK_STEPS : BOOKING_STEPS;
    const field = steps[flow.stepIndex];

    if (field === 'phone' && !isValidPhone(trimmed)) {
      return { replies: [chatbotContent[lang].prompts.invalidPhone, chatbotContent[lang].prompts.askPhone], flow };
    }

    let value = trimmed;
    if (field === 'notes') {
      const none = chatbotContent[lang].chips.none;
      if (normalize(trimmed) === 'none' || normalize(trimmed) === normalize(none)) value = '';
    }
    if (field === 'travelDate' && (normalize(trimmed) === 'flexible' || normalize(trimmed) === normalize(chatbotContent[lang].chips.flexible))) {
      value = lang === 'hi' ? 'लचीली तारीख' : 'Flexible dates';
    }

    const intent = detectIntent(trimmed);
    if (field === 'name' && (intent === 'book' || intent === 'callback')) {
      // user typed intent again mid-flow — keep collecting name
    }

    return advanceFlow(flow, field, value, lang);
  }

  const intent = detectIntent(trimmed);
  if (intent === 'book') {
    const f = startFlow('booking');
    f.data.name = trimmed.length > 2 && !/book|quote|बुक|कोट/.test(normalize(trimmed)) ? trimmed : undefined;
    if (f.data.name) {
      f.stepIndex = 1;
      return { replies: [chatbotContent[lang].prompts.askPhone], flow: f };
    }
    return { replies: [chatbotContent[lang].prompts.askName], flow: f };
  }
  if (intent === 'callback') {
    const f = startFlow('callback');
    return { replies: [chatbotContent[lang].prompts.askName], flow: f };
  }

  return { replies: [knowledgeReply(trimmed, lang)], flow: null };
}

export function getQuickActions(lang) {
  const q = chatbotContent[lang].quickActions;
  return [
    { label: q.packages, value: '__action__:packages' },
    { label: q.services, value: '__action__:services' },
    { label: q.contact, value: '__action__:contact' },
    { label: q.book, value: '__action__:book' },
    { label: q.callback, value: '__action__:callback' },
    { label: q.faq, value: '__action__:faq' },
  ];
}
