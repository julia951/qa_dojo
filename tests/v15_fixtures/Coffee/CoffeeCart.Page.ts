import{ test,  expect, Locator, Page } from "@playwright/test";

export class CoffeeCartPage {
  constructor(private page: Page) {}

  readonly espressoCup = this.page.locator("[data-test='Espresso']");
  readonly checkoutButton = this.page.locator('[data-test="checkout"]');
  readonly quantityText = this.page.locator('[class="unit-desc"]');
  readonly deleteIcon = this.page.locator('[class="list"]');
  readonly luckyBannerLocator = this.page.locator("#app");
  readonly closeBtn = this.page.locator('[class="close"]');
  readonly checkoutBtn = this.page.locator('[data-test="checkout"]');
  readonly cupLocator = this.page.locator("//*[@class='cup-body' and @class != 'disabled-hover']");
  readonly prices = {
    default: "Total: $119.00",
    empty: "Total: $0.00",
    espressoDouble: "Total: $20.00",
    espressoOne: "Total: $10.00",
  };
  readonly checkboxInput = this.page.locator("input[type='checkbox']");
  readonly remove1EspressoBtn = this.page.locator("[aria-label='Remove one Espresso']");
  readonly removeAllEspressoBtn = this.page.locator("[aria-label='Remove all Espresso']");
  readonly cartTab = this.page.locator("[aria-label='Cart page']");
  readonly usernameInput: Locator = this.page.locator("[name='name']");
  readonly emailInput: Locator = this.page.locator("[type='email']");
  readonly promoCheckbox: Locator = this.page.locator("[aria-label='Promotion message']");
  readonly submitButton: Locator = this.page.locator("[type='submit']");

  async navigate() {
    await this.page.goto("https://coffee-cart.app/");
  }

  async clickOnEspresso() {
    await this.espressoCup.click();
  }

  async clickOnCheckout() {
    await this.checkboxInput.click();
  }

  async openCart() {
    await this.checkoutBtn.click();
  }

  async removeEspresso() {
    await this.remove1EspressoBtn.click();
  }

  async hoverCheckout() {
    await this.checkoutBtn.hover();
  }

  async openCartTab() {
    await this.cartTab.click();
  }

  async clickRemoveIcon() {
    await this.removeAllEspressoBtn.click();
  }

  async deleteItemFromCart() {
    await this.removeAllEspressoBtn.click();
  }

  async purchase(username: string, email: string) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.promoCheckbox.check();
    await this.submitButton.click();
  }

  async closeCart() {
    await this.closeBtn.click();
  }

  async clickAllCups() {
    const cupAllLocators = await this.cupLocator.all();
    for (const cup of cupAllLocators) {
      await cup.click();
    }
  }

  //Чекі
  
  async checkQuantity(expectedQuantity: string) {
    await expect(this.quantityText).toContainText(expectedQuantity);
  }

  async checkSuccessMessage(expectedText: string) {
    const successMsg = this.page.locator('[class="snackbar success"]');
    await expect(successMsg).toContainText(expectedText);
  }

  async checkTotalPrice(price: string = this.prices.default) {
    await expect(this.checkoutBtn).toContainText(price);
  }

  async checkNoItemsMessage(expectedMessage: string) {
    await expect(this.deleteIcon).toContainText(expectedMessage);
  }

  async checkLuckyBanner(expectedText: string) {
    await expect(this.luckyBannerLocator).toContainText(expectedText);
  }
}