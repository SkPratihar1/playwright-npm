import { test as base ,chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { StationPage } from '../pages/StationPage';
import path from 'path';

type Fixtures = {
  loginPage: LoginPage;
  stationPage:StationPage
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  // loginPage: async ({}, use, workerInfo) => {
  //   const browser = await chromium.launch({ headless: false });
  //   const context = await browser.newContext({
  //     storageState: path.resolve(__dirname, '../playwright/.auth/state.json'),
  //   });
  //   const page = await context.newPage();
  //   const loginPage = new LoginPage(page);

  //   await use(loginPage);

  //   await context.close();
  //   await browser.close();
  // },
  stationPage: async ({ page }, use) => {
    const stationPage = new StationPage(page);
    await use(stationPage);
    
  }
});
export const expect = base.expect;
