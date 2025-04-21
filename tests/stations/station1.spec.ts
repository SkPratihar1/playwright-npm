// import { Page, test } from '@playwright/test';
// import { LoginPage } from '../../pages/LoginPage';
// import { StationPage } from '../../pages/StationPage';

// test.describe.configure({ mode: 'serial' });

// test.describe('Station Page Functionalities', () => {
//   let sessionPage: Page;

//   test.beforeAll(async ({ page }) => {
//     sessionPage = page;
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login('admin@eroev.com', 'Itobuz#1234');
//     await page.goto('/dashboard/stations?page=1');
//     page.on('close', () => console.log('⚠️ Page was closed!'));
//   });

//   test('Search station', async () => {
//     const stationPage = new StationPage(sessionPage);
//     await stationPage.searchStation('CP001_Electrive');
//   });

//   test('View logs of first station', async () => {
//     const stationPage = new StationPage(sessionPage);
//     await stationPage.viewFirstStation('CP001_Electrive');
//   });
// });


// import { test, Page, expect } from '@playwright/test';
// import { LoginPage } from '../../pages/LoginPage';
// import { StationPage } from '../../pages/StationPage';

// test.describe('Station Page Functionalities', () => {
//   let sessionPage: Page;

//   test.beforeEach(async ({ page }) => {
//     sessionPage = page;
    
//     const loginPage = new LoginPage(sessionPage);
//     await loginPage.goto();
//     await loginPage.login('admin@eroev.com', 'Itobuz#1234');

//     // Log event (optional)
//     sessionPage.on('close', () => console.log('⚠️ Page was closed!'));
//     await sessionPage.waitForURL('/dashboard/stations?page=1')
//     // Navigate to station list after login
//     await sessionPage.goto('/dashboard/stations?page=1');
//     //await expect(sessionPage).toHaveURL(/stations/); // extra check (optional)
//   });

//   test('Search station', async () => {
//     const stationPage = new StationPage(sessionPage);
//     await stationPage.searchStation('CP001_Electrive');
//   });

//   test('View logs of first station', async () => {
//     const stationPage = new StationPage(sessionPage);
//     await stationPage.viewFirstStation('CP001_Electrive');
//   });
// });


import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { StationPage } from '../../pages/StationPage';

test.describe('Station Page Functionalities', () => {
  let sessionPage: Page;

  test.beforeAll(async ({ browser }) => {
    // Create a browser context and page that is shared across all tests in this spec
    const browserContext = await browser.newContext();
    sessionPage = await browserContext.newPage();

    const loginPage = new LoginPage(sessionPage);
    await loginPage.goto();
    await loginPage.login('admin@eroev.com', 'Itobuz#1234');

    // Log event (optional)
    sessionPage.on('close', () => console.log('⚠️ Page was closed!'));
    await sessionPage.waitForURL('/dashboard/stations?page=1');
    await sessionPage.goto('/dashboard/stations?page=1');
  });

  test.afterAll(async () => {
    // Close the session page after all tests in this spec are done
    await sessionPage.context().close();
  });

  test('Search station', async () => {
    const stationPage = new StationPage(sessionPage);
    await stationPage.searchStation('CP001_Electrive');
  });

  test('View logs of first station', async () => {
    const stationPage = new StationPage(sessionPage);
    await stationPage.viewFirstStation('CP001_Electrive');
  });
});
