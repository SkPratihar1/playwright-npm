import{test,expect, Page} from '@playwright/test';
import{LoginPage} from '../../pages/LoginPage'


test.describe("Provider search",async()=>{
    let sessionPage:Page
    test.beforeAll(async({browser}) =>{
        const browserContext = await browser.newContext();
        sessionPage = await browserContext.newPage();
        const loginPage = new LoginPage(sessionPage)

        await loginPage.goto()
        await loginPage.login('admin@eroev.com', 'Itobuz#1234');

        await sessionPage.waitForURL('/dashboard/stations?page=1');
        await sessionPage.goto('/dashboard/providers?page=1');

    })
    test.afterAll(async()=>{
        await sessionPage.context().close();

    })
    test('should show "Search data not found" when no matching row exists', async ({ }) => {
        const searchInput = sessionPage.getByPlaceholder('Search'); // update if your search input differs
        await searchInput.fill('InvalidSearchKeyword');
        await searchInput.press('Enter');
    
        const noRowsMessage = await sessionPage.locator('text=No rows');
        await expect(noRowsMessage).toBeVisible();
      });
    
      test('should display matching data when searched', async ({  }) => {
        await sessionPage.waitForTimeout(500);
        const allEmailTexts = await sessionPage.locator('[data-field="email"]').allTextContents();
        const emails = allEmailTexts.slice(1); // skips the header
        console.log(emails);
        const randomEmail = emails[Math.floor(Math.random() * emails.length)];
        console.log(randomEmail);
        const searchInput = sessionPage.getByPlaceholder('Search'); // adjust selector as needed
        await searchInput.fill(randomEmail);
        await searchInput.press('Enter');
        // wait for filter effect

        await sessionPage.waitForTimeout(500); 
        
    
        // const firstNameCell = await sessionPage.locator('div[data-field="firstname"] >> text=Itobuz');
        // await expect(firstNameCell).toBeVisible();
    
        const emailCell = sessionPage.locator(`div[data-field="email"] >> text=${randomEmail}`);

        await expect(emailCell).toBeVisible();



        const visibleEmails = await sessionPage.locator('[data-field="email"]').allTextContents();
        const displayEmails = visibleEmails.slice(1); 
        console.log(displayEmails)
    
        expect(displayEmails[0]).toContain(randomEmail);
      });

})