import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { StationPage } from '../../pages/StationPage';

test.describe('Station Page Functionalities', () => {
  let sessionPage: Page;

  test.beforeEach(async ({ page }) => {
    sessionPage = page;
    
    const loginPage = new LoginPage(sessionPage);
    await loginPage.goto();
    await loginPage.login('helpdesk.jiva@gmail.com', 'Itobuz#1234');

    // Log event (optional)
    sessionPage.on('close', () => console.log('⚠️ Page was closed!'));
    await sessionPage.waitForURL('/dashboard/stations?page=1')
    // Navigate to station list after login
    await sessionPage.goto('/dashboard/stations?page=1');
    //await expect(sessionPage).toHaveURL(/stations/); // extra check (optional)
  });

  test('Search station', async () => {
    const stationPage = new StationPage(sessionPage);
    await stationPage.searchStation('CP001_Electrive');
  });

  // test('View logs of first station', async () => {
  //   const stationPage = new StationPage(sessionPage);
  //   await stationPage.viewFirstStation('CP001_Electrive');
  // });
});
