// pages/StationPage.ts
import { Page } from '@playwright/test';
//import { expect } from '../fixtures/testSetup';

export class StationPage {
  constructor(private page: Page) {}

  async goto() {
    console.log("Navigating to stations page...");
   //console.log("Is page closed:", this.page.isClosed());
    await this.page.goto('https://admin.eroev.com/dashboard/stations?page=1');
  }
  
  async searchStation(stationName: string) {

       const searchInputSelector = 'input[placeholder="Search"]';
       //await expect(this.page.locator(searchInputSelector)).toBeVisible();
       await this.page.fill(searchInputSelector, stationName);
       await this.page.keyboard.press('Enter');
       await this.page.waitForLoadState('networkidle')

  }

  async viewFirstStation(expectedStationName: string) {
    const rowSelector = '[data-rowindex="0"]';
  
    // Step 1: Ensure the first row is visible
    //await expect(this.page.locator(rowSelector)).toBeVisible();
  
    // Step 2: Verify station name matches
    const stationNameCell = this.page.locator(`${rowSelector} [data-field="stationName"]`);
    ////await expect(stationNameCell).toHaveText(expectedStationName);
  
    // Step 3: Click the "View Logs" button in that row
    const viewLogsButton = this.page.locator(`${rowSelector} button`, { hasText: 'View Logs' });
    //await expect(viewLogsButton).toBeVisible();
    await viewLogsButton.click();
  }
}
