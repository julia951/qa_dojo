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
    await this.firstNameInput.fill(registerData.firstName);
    await this.lastNameInput.fill(registerData.lastName);
    await this.genderMale.click();
    await this.phoneNumberInput.fill(registerData.telephoneNumber);
    await this.submitButton.click();
  }

  async checkSuccessfulSubmission(firstName: string, lastName: string, telephoneNumber: string) {
    await expect(this.successMessage).toContainText('Thanks for submitting the form');
    await expect(this.resultTable).toContainText(`${firstName} ${lastName}`);
    await expect(this.resultTable).toContainText('Male');
    await expect(this.resultTable).toContainText(`${telephoneNumber}`);
  }

  async checkUnsuccessfulSubmission() {
    await expect(this.successMessage).not.toBeVisible();
  }
}