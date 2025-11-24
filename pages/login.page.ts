import { Page, Locator } from '@playwright/test';
import { ADMIN_USER } from '@helpers/users';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  readonly invalidCredentialsError: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });

    this.invalidCredentialsError = page.getByRole('alert');
    this.usernameError = page.locator(
      'div.oxd-input-group:has(input[name="username"]) .oxd-input-field-error-message',
    );
    this.passwordError = page.locator(
      'div.oxd-input-group:has(input[name="password"]) .oxd-input-field-error-message',
    );
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAsAdmin() {
    await this.login(ADMIN_USER.username, ADMIN_USER.password);
  }
}
