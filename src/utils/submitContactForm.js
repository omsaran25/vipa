import { siteLinks } from '../data/siteLinks';

const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(siteLinks.inboxEmail)}`;

async function submitViaFormSubmit({ name, email, phone, message }) {
  const response = await fetch(FORM_SUBMIT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      message,
      _subject: `Vipa Holidays — Contact from ${name}`,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  if (!response.ok) {
    throw new Error('Could not deliver your message. Please WhatsApp or call us.');
  }

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = { success: true };
  }

  if (data.success === false) {
    throw new Error(data.message || 'Could not deliver your message.');
  }

  return { success: true, channel: 'formsubmit' };
}

/**
 * Sends the contact form to vipaholidays@gmail.com.
 * Prefers /api/contact (Gmail SMTP on Vercel). Falls back to FormSubmit in the browser if SMTP is not configured.
 */
export async function submitContactForm({ name, email, phone, message }) {
  const payload = {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
  };

  try {
    const apiResponse = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (apiResponse.ok) {
      return { success: true, channel: 'api' };
    }

    const errorBody = await apiResponse.json().catch(() => ({}));

    if (apiResponse.status === 503 && errorBody.code === 'EMAIL_NOT_CONFIGURED') {
      return submitViaFormSubmit(payload);
    }

    throw new Error(errorBody.error || 'Could not send your message.');
  } catch (error) {
    if (error instanceof TypeError) {
      // Dev server without /api — use FormSubmit from the browser
      return submitViaFormSubmit(payload);
    }
    throw error;
  }
}
