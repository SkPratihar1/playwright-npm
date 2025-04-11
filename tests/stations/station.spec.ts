import { test, expect } from '../../fixtures/testSetup';
import testData from '../../utils/env';
import { StationPage } from '../../pages/StationPage';

test.describe('Station Page Functionalities', () => {
  test.beforeEach(async ({ loginPage }) => {
    // Step 1: Auto Login
    await loginPage.goto();
    await loginPage.login(testData.EMAIL, testData.PASSWORD);

    // Step 2: Go to stations page after login
    await loginPage['page'].waitForLoadState('networkidle');
    await loginPage['page'].goto(`${testData.BASE_URL}/dashboard/stations?page=1`);
  });

  test('Search and interact with station list', async ({ stationPage}) => {
    //const page = loginPage['page'];
    //const stationPage = new StationPage(page);

    // // Step 3: Search for a station
    // const searchInputSelector = 'input[placeholder="Search"]';
    // await expect(page.locator(searchInputSelector)).toBeVisible();
    // await page.fill(searchInputSelector, 'CP001_Electrive');
    // await page.keyboard.press('Enter');
    // await page.waitForLoadState('networkidle')

    await stationPage.searchStation('CP001_Electrive')
    await stationPage.viewFirstStation('CP001_Electrive')

    // Step 4: Validate results
    // const tableRowSelector = 'table tbody tr';
    // const rowCount = await page.locator(tableRowSelector).count();
    // expect(rowCount).toBeGreaterThan(0);

    // // Step 5: Check station details button exists and click it (example)
    // const viewButton = page.locator('table tbody tr:first-child button:has-text("View")');
    // await expect(viewButton).toBeVisible();
    // await viewButton.click();

    // // Step 6: Validate station detail page loaded (change this based on actual page)
    // await expect(page).toHaveURL(/\/stations\/\d+/);
  });
});
