import { expect, Locator, Page } from '@playwright/test';

export class AddEmployeePage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;

  readonly firstNameError: Locator;
  readonly lastNameError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.employeeIdInput = page.locator('div.oxd-input-group:has(label:has-text("Employee Id")) input');

    this.firstNameError = page
      .locator('div.oxd-input-group:has(input[name="firstName"]) > span.oxd-input-field-error-message')
      .first();
    this.lastNameError = page
      .locator('div.oxd-input-group:has(input[name="lastName"]) > span.oxd-input-field-error-message')
      .first();
  }

  generateRandomEmployeeId(): string {
    const length = 10;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  async navigateToAddEmployee() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await this.page.getByRole('link', { name: 'Add Employee' }).click();
  }

  async fillEmployeeForm(firstName: string, lastName: string, middleName?: string, employeeId?: string) {
    await this.firstNameInput.fill(firstName);
    if (middleName) await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);

    if (employeeId) {
      await this.employeeIdInput.fill(employeeId);
    }
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }
}
