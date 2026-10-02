import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const outDir = '/opt/cursor/artifacts/screenshots';
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

let apiHit = false;
await page.route('**/api/contact', async (route) => {
  apiHit = true;
  const body = route.request().postDataJSON();
  if (!body?.email || !body?.name) {
    await route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: 'bad' }) });
    return;
  }
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ success: true }),
  });
});

await page.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle' });
await page.getByRole('heading', { name: 'Send Us a Direct Message' }).scrollIntoViewIfNeeded();

await page.locator('#contact input[placeholder="Your Full Name"]').fill('Test User');
await page.locator('#contact input[placeholder="+91 Mobile Number"]').fill('8696924806');
await page.locator('#contact input[placeholder="name@example.com"]').fill('tester@example.com');
await page.locator('#contact textarea').fill('Please share Jodhpur Jaisalmer quote for 4 guests.');

await page.getByRole('button', { name: /Send Quote Request/ }).click();
await page.waitForSelector('text=Message sent successfully', { timeout: 8000 });

if (!apiHit) throw new Error('Contact form did not call /api/contact');

await page.screenshot({ path: `${outDir}/contact-form-email-success.png` });
console.log('CONTACT_EMAIL_FLOW_OK');
await browser.close();
