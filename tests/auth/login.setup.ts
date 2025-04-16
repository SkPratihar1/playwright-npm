// // tests/auth/login.setup.ts
// import { chromium } from '@playwright/test';
// import testData from '../../utils/env';

// (async () => {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();

//   await page.goto(`${testData.BASE_URL}/login`);

//   await page.fill('input[name="email"]', testData.EMAIL);
//   await page.fill('input[name="password"]', testData.PASSWORD);
//   await page.click('button[type="submit"]');

//   await page.waitForNavigation({ waitUntil: 'networkidle' });

//   // Save session state
//   await page.context().storageState({ path: 'playwright/.auth/state.json' });

//   console.log('✅ Session saved!');
//   await browser.close();
// })();


import { chromium } from '@playwright/test';
import testData from '../../utils/env'; // Replace with your actual data source
import fs from 'fs';
import path from 'path';


(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`${testData.BASE_URL}/login`);

  await page.fill('input[name="email"]', testData.EMAIL);
  await page.fill('input[name="password"]', testData.PASSWORD);
  await page.click('button[type="submit"]');

  // Wait for navigation or specific element to confirm login
  //await page.waitForNavigation({ waitUntil: 'networkidle' });
  await Promise.all([
    page.waitForURL('**/dashboard/stations?page=1', { waitUntil: 'networkidle' }), // or whatever URL it navigates to
    // page.click('button[type="submit"]'),
  ]);

  // ✅ Ensure the directory exists
  const storageDir = path.resolve(__dirname, '../../playwright/.auth');
  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  // ✅ Save session state to JSON file
  await page.context().storageState({ path: path.join(storageDir, 'state.json') });

  console.log('✅ Auth session saved to playwright/.auth/state.json');
  await page.goto(`${testData.BASE_URL}/dashboard/stations?page=1`);
  //await page.waitForLoadState('networkidle');


  await browser.close();
})();
