import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { StationPage } from '../pages/StationPage';

type Fixtures = {
  loginPage: LoginPage;
  stationPage:StationPage
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  stationPage: async ({ page }, use) => {
    const stationPage = new StationPage(page);
    await use(stationPage);
  }
});
export const expect = base.expect;
