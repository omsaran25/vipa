import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const outDir = '/opt/cursor/artifacts/screenshots';
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

await page.addInitScript(() => {
  window.__waOpened = false;
  const orig = window.open;
  window.open = (...args) => {
    window.__waOpened = args[0];
    return null;
  };
});

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /Chat with travel assistant|ट्रैवल असिस्टेंट/ }).click();
await page.waitForSelector('text=Vipa Travel Assistant', { timeout: 5000 }).catch(() =>
  page.waitForSelector('text=वीपा ट्रैवल असिस्टेंट', { timeout: 5000 })
);
await page.screenshot({ path: `${outDir}/chatbot-open.png` });

await page.getByRole('button', { name: 'Book / get quote' }).click();
await page.locator('input[placeholder*="Ask about"]').fill('Rahul Sharma');
await page.locator('input[placeholder*="Ask about"]').press('Enter');
await page.locator('input[placeholder*="Ask about"]').fill('9876543210');
await page.locator('input[placeholder*="Ask about"]').press('Enter');
await page.locator('input[placeholder*="Ask about"]').fill('Kerala');
await page.locator('input[placeholder*="Ask about"]').press('Enter');
await page.locator('input[placeholder*="Ask about"]').fill('flexible');
await page.locator('input[placeholder*="Ask about"]').press('Enter');
await page.locator('input[placeholder*="Ask about"]').fill('2');
await page.locator('input[placeholder*="Ask about"]').press('Enter');
await page.locator('input[placeholder*="Ask about"]').fill('none');
await page.locator('input[placeholder*="Ask about"]').press('Enter');

const waUrl = await page.evaluate(() => window.__waOpened);
if (!waUrl || !String(waUrl).includes('wa.me/918696924806')) {
  throw new Error(`WhatsApp was not opened to correct number. Got: ${waUrl}`);
}
if (!String(waUrl).includes('Kerala') || !String(waUrl).includes('Rahul')) {
  throw new Error('WhatsApp message missing booking details');
}

await page.screenshot({ path: `${outDir}/chatbot-booking-whatsapp.png` });
console.log('CHATBOT_VERIFY_OK');
await browser.close();
