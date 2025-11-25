import { test as base, Page } from '@playwright/test';
import { LoginPage } from '@pages/login.page';

export const test = base.extend<{
  loggedInPage: Page;
}>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin', 'admin123');
    await use(page);
  },
});
