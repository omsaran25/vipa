import nodemailer from 'nodemailer';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'vipaholidays@gmail.com';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body || {};

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    return res.status(503).json({
      error: 'Email service not configured',
      code: 'EMAIL_NOT_CONFIGURED',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safePhone = phone.trim();
    const safeMessage = message.trim();

    await transporter.sendMail({
      from: `"Vipa Holidays Website" <${gmailUser}>`,
      to: TO_EMAIL,
      replyTo: safeEmail,
      subject: `Vipa Holidays — New contact from ${safeName}`,
      text: [
        'New message from the Vipa Holidays website contact form',
        '',
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Phone: ${safePhone}`,
        '',
        'Message:',
        safeMessage,
      ].join('\n'),
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(safePhone)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(safeMessage).replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact email failed:', error);
    return res.status(500).json({ error: 'Failed to send email. Please try WhatsApp or call us.' });
  }
}
