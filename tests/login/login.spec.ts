import { expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { test } from '@fixtures/auth.fixture';

test.describe('Login', () => {
  test('should allow login with valid credentials', async ({ loggedInPage }) => {
    const page = loggedInPage;
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { level: 6 })).toHaveText('Dashboard');
  });

  test('should show an error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wronguser', 'wrongpass');

    await expect(loginPage.invalidCredentialsError).toHaveText('Invalid credentials');
  });

  test('should require both username and password fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(loginPage.usernameError).toHaveText('Required');
    await expect(loginPage.passwordError).toHaveText('Required');
  });
});
