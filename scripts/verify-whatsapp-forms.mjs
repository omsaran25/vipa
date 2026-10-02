import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const outDir = '/opt/cursor/artifacts/screenshots';
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

let lastWaUrl = '';
await page.addInitScript(() => {
  const orig = window.open;
  window.open = (url, ...rest) => {
    window.__lastWa = url;
    return orig.call(window, url, ...rest);
  };
});

await page.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle' });

await page.locator('#contact input[placeholder="Your Full Name"]').fill('Contact Test');
await page.locator('#contact input[placeholder="+91 Mobile Number"]').fill('8696924806');
await page.locator('#contact input[placeholder="name@example.com"]').fill('contact@test.com');
await page.locator('#contact textarea').fill('Need Jaisalmer quote for 6 guests.');
await page.getByRole('button', { name: /Send Quote Request/ }).click();
await page.waitForSelector('text=WhatsApp has opened', { timeout: 5000 });

lastWaUrl = await page.evaluate(() => window.__lastWa);
if (!lastWaUrl?.includes('wa.me/918696924806')) throw new Error('Contact WA failed: ' + lastWaUrl);

await page.getByRole('button', { name: /Get Free Quote/i }).first().click();
await page.locator('input[placeholder="Rahul Sharma"]').fill('Quote Test');
await page.locator('form').filter({ has: page.locator('input[placeholder="Rahul Sharma"]') }).locator('input[type="tel"]').fill('8696924806');
await page.locator('input[placeholder="rahul@example.com"]').fill('quote@test.com');
await page.getByRole('button', { name: /Request Custom Quote/ }).click();
await page.waitForSelector('text=Quote Request Submitted', { timeout: 5000 });

const quoteWa = await page.evaluate(() => window.__lastWa);
if (!quoteWa?.includes('wa.me/918696924806') || !quoteWa.includes('Quote')) {
  throw new Error('Booking WA missing details: ' + quoteWa);
}

await page.screenshot({ path: `${outDir}/whatsapp-forms-verified.png` });
console.log('WHATSAPP_FORMS_OK');
await browser.close();
