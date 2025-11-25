import { test } from '@fixtures/auth.fixture';
import { AddEmployeePage } from '@pages/add-employee.page';
import { expect } from '@playwright/test';

test.describe('Add Employee', () => {
  test('should add employee and navigate to details page', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const addEmployeePage = new AddEmployeePage(page);

    await addEmployeePage.navigateToAddEmployee();

    const firstName = 'John';
    const lastName = 'Doe';

    const employeeId = addEmployeePage.generateRandomEmployeeId();
    await addEmployeePage.fillEmployeeForm(firstName, lastName, undefined, employeeId);
    await addEmployeePage.submit();

    await expect(page).toHaveURL(/pim\/viewPersonalDetails\/empNumber\/\d+/);
    await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue(firstName);
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue(lastName);
  });

  test('should show validation errors when required fields are missing', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const addEmployeePage = new AddEmployeePage(page);

    await addEmployeePage.navigateToAddEmployee();

    const employeeId = addEmployeePage.generateRandomEmployeeId();
    await addEmployeePage.fillEmployeeForm('', '', undefined, employeeId);

    await addEmployeePage.submit();

    await expect(addEmployeePage.firstNameError).toHaveText('Required');
    await expect(addEmployeePage.lastNameError).toHaveText('Required');
  });
});
