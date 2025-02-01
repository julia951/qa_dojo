import{ test,  expect, Locator, Page } from "@playwright/test";

export class CoffeeCartPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("https://coffee-cart.app/");
  }

  async clickOnEspresso() {
    await this.page.locator("[data-test='Espresso']").click();
  }

  async clickOnCheckout() {
    await this.page.locator("input[type='checkbox']").click();
  }

  async openCart() {
    await this.page.locator("[data-test='checkout']").click();
  }

  async espressoRemove() {
    await this.page.locator("[aria-label='Remove one Espresso']").click();
  }

  async hoverCheckout() {
    await this.page.locator("[data-test='checkout']").hover();
  }

  async openCartTab() {
    await this.page.locator("[aria-label='Cart page']").click();
  }

  async clickRemoveIcon() {
    await this.page.locator("[aria-label='Remove all Espresso']").click();
  }

  async purchase(username: string, email: string) {
    await this.page.locator("[name='name']").fill(username);
    await this.page.locator("[type='email']").fill(email);
    await this.page.locator("[aria-label='Promotion message']").check();
    await this.page.locator("[type='submit']").click();
  }
}