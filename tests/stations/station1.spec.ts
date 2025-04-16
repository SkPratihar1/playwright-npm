import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { StationPage } from '../../pages/StationPage';

//test.use({ storageState: 'playwright/.auth/state.json' });
test.describe('Station Page Functionalities', () => {
test.beforeEach(async ({ page }) => {
  // const loginPage = new LoginPage(page);
  // await loginPage.goto();
  // await loginPage.login('admin@eroev.com', 'Itobuz#1234');
  page.on('close', () => console.log('⚠️ Page was closed!'));
  await page.goto('/dashboard/stations?page=1');
});

test('Search station', async ({ page }) => {
  const stationPage = new StationPage(page);
  await stationPage.searchStation('CP001_Electrive');
});

test('View logs of first station', async ({ page }) => {
  const stationPage = new StationPage(page);
  await stationPage.viewFirstStation('CP001_Electrive');
})
})