import test, { Page } from "@playwright/test";

export class CoffeeCartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getTextFieldLocator = (label: string) => this.page.getByLabel(label);

  async navigateTo() {
    await this.page.goto("https://coffee-cart.app");
  }

  async clickCofeeCups(title: string | Array<string>) {

    if (typeof title === 'string') {
      return this.page.locator(`[data-test='${title}']`).click();
    }

    for (const drink of title) {
      await this.page.locator(`[data-test='${drink}']`).click();
    }
  }

  async fillOrderForm(orderData: {Name: string; Email: string}) {

    for (const [key, value] of Object.entries(orderData)) 
      await this.page.getByLabel(key).fill(value);
  }

  async eraseFieldBy(label: string) {

    await this.getTextFieldLocator(label).fill("");
  }

  async clickSubmitButton() {

    await this.page.getByRole("button", { name: "Submit"}).click();
  }

  async clickCheckout() {

    await this.page.locator("[data-test='checkout'").click();
  }
}