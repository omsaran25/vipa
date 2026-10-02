import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const base = 'http://localhost:5173/';
const outDir = '/opt/cursor/artifacts/screenshots';

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.goto(base, { waitUntil: 'networkidle' });

const flightTrain = await page.locator('text=Flight & Train Ticketing').count();
const hiFlight = await page.locator('text=फ्लाइट और ट्रेन टिकट').count();
if (flightTrain + hiFlight > 0) {
  throw new Error('Flight & Train service card still visible');
}

await page.locator('#services').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const serviceCards = await page.locator('#services .grid > div').count();
if (serviceCards !== 5) {
  throw new Error(`Expected 5 service cards, got ${serviceCards}`);
}
await page.screenshot({ path: `${outDir}/services-five-cards.png`, fullPage: false });

await page.locator('#services button:has-text("Request Details")').first().click();
await page.waitForSelector('text=Get Your Custom Package Quote', { timeout: 5000 });
await page.screenshot({ path: `${outDir}/booking-modal-open.png` });
await page.locator('div.fixed.inset-0.z-50 button').first().click();
await page.waitForTimeout(400);

await page.locator('#packages').scrollIntoViewIfNeeded();
await page.locator('footer button:has-text("Kashmir")').first().click();
await page.waitForTimeout(800);
await page.screenshot({ path: `${outDir}/packages-kashmir-filter.png` });

await page.locator('footer input[type="email"]').fill('test@example.com');
await page.locator('footer form button[type="submit"]').click();
await page.waitForSelector('text=Thanks! You are subscribed', { timeout: 5000 });
await page.screenshot({ path: `${outDir}/footer-newsletter-success.png` });

const brokenImages = await page.evaluate(() => {
  return Array.from(document.images)
    .filter((img) => !img.complete || img.naturalWidth === 0)
    .map((img) => img.src);
});
if (brokenImages.length) {
  throw new Error(`Broken images: ${brokenImages.join(', ')}`);
}

console.log('VERIFY_OK');
await browser.close();
