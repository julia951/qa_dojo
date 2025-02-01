import{ test,  expect, Locator, Page } from "@playwright/test";

export class RegisterPage {
  private page: Page;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private genderMale: Locator;
    private phoneNumberInput: Locator;
    private submitButton: Locator;
    private successMessage: Locator;
    private resultTable: Locator;

    
  constructor( page: Page) {
    this.page = page;
        this.firstNameInput = page.locator('[id="firstName"]');
        this.lastNameInput = page.locator('[id="lastName"]');
        this.genderMale = page.locator('label[for="gender-radio-1"]');
        this.phoneNumberInput = page.locator('[id="userNumber"]');
        this.submitButton = page.locator('[id="submit"]');
        this.successMessage = page.locator('#example-modal-sizes-title-lg');
        this.resultTable = page.locator('tbody');
  }

  async navigate() {
    await this.page.goto("https://demoqa.com/automation-practice-form");
  }

  async fillRegisterForm(registerData: { firstName: string, lastName: string, telephoneNumber: string }) {
    
    await this.page.getByPlaceholder("First Name").fill(registerData.firstName);
    await this.page.getByPlaceholder("Last Name").fill(registerData.lastName);
    await this.page.getByText('Male', { exact: true }).click();
    await this.page.getByPlaceholder('Mobile Number').fill(registerData.telephoneNumber);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
}