


// import { test, expect } from '../../fixtures/testSetup';
// import testData from '../../utils/env';

// test('valid login', async ({ loginPage }) => {
//   await loginPage.goto();
//   await loginPage.login(testData.EMAIL, testData.PASSWORD);

//   // Add post-login assertion here (customize as needed)
//   await expect(loginPage['page']).toHaveURL(/dashboard/);


//   // ✅ Wait for dashboard element or URL

//   // ✅ Save the login session for reuse
//   await loginPage['page'].context().storageState({ path: 'playwright/.auth/state.json' });
// });


import { test, expect } from '../../fixtures/testSetup';
import testData from '../../utils/env';

test.describe('🔐 Manual Login Sanity Test', () => {
  test('valid login should redirect to dashboard', async ({ loginPage }) => {
    // Navigate to login page
    await loginPage.goto();

    // Perform login
    await loginPage.login(testData.EMAIL, testData.PASSWORD);

    // Assert the user is redirected to dashboard
    await expect(loginPage['page']).toHaveURL(/dashboard/);

    // Optional: check for specific dashboard UI element
    await expect(loginPage['page'].getByText('All Stations')).toBeVisible();
    await loginPage['page'].context().storageState({ path: 'playwright/.auth/state.json' });
    // ✅ Do not overwrite state.json here
  });
});