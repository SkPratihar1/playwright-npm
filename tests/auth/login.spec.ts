


import { test, expect } from '../../fixtures/testSetup';
import testData from '../../utils/env';

test('valid login', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(testData.EMAIL, testData.PASSWORD);

  // Add post-login assertion here (customize as needed)
  await expect(loginPage['page']).toHaveURL(/dashboard/);
});
