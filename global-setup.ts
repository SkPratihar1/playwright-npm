// global-setup.ts
import { chromium } from '@playwright/test';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://admin.eroev.com/login');
  await page.fill('input[name="email"]', 'admin@eroev.com');
  await page.fill('input[name="password"]', 'Itobuz#1234');
  await page.click('button[type="submit"]');

  // Optional: Wait for redirect to dashboard
  await page.waitForURL('**/dashboard**');

  // Save login session
  await page.context().storageState({ path: 'playwright/.auth/state.json' });

  await browser.close();
}
