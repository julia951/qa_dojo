import test, { expect } from "@playwright/test";
import { CoffeeCartPage } from "./CoffeeCart.Page";

const usernameText = "Julka";
const emailText = "julka@test.com";

test.beforeEach(async ({ page }) => {
  const coffeeCart = new CoffeeCartPage(page);
  await coffeeCart.navigate();
});

test("CC-002 Test successful order Multiple Coffees", async ({ page }) => {

  const coffeeCart = new CoffeeCartPage(page);

  const successText = "Thanks for your purchase. Please check your email for payment.";
  const successMsg = page.locator('[class="snackbar success"]');

  await coffeeCart.clickOnEspresso();
  await coffeeCart.clickOnEspresso();
  await coffeeCart.clickOnEspresso();
  await coffeeCart.openCart();
  await coffeeCart.purchase(usernameText, emailText);

  await expect(successMsg).toContainText(successText);
});

test("CC-003 Test Changing items By Plus Button", async ({ page }) => {

  const coffeeCart = new CoffeeCartPage(page);

  const totalPrice = "Total: $20.00";
  const checkout = page.locator('[data-test="checkout"]');
  const quantityText = page.locator('[class="unit-desc"]');

  await coffeeCart.clickOnEspresso();
  await coffeeCart.clickOnEspresso();
  await coffeeCart.hoverCheckout();

  await expect(checkout).toContainText(totalPrice);
  await expect(quantityText).toContainText("x 2");
});

test("CC-004 Test Deleting Item from Cart Using -", async ({ page }) => {

  const coffeeCart = new CoffeeCartPage(page);

  const zeroTotalPrice = "Total: $0.00";
  const checkout = page.locator('[data-test="checkout"]');

  await coffeeCart.clickOnEspresso();
  await coffeeCart.hoverCheckout();
  await coffeeCart.espressoRemove();

  await expect(checkout).toContainText(zeroTotalPrice);
});

test("CC-005 Test Deleting Item from Cart Tab", async ({ page }) => {

  const coffeeCart = new CoffeeCartPage(page);

  const deleteIcon = page.locator('[class="list"]');

  await coffeeCart.clickOnEspresso();
  await coffeeCart.openCartTab();
  await coffeeCart.clickRemoveIcon();

  await expect(deleteIcon).toContainText("No coffee, go add some.");
});

test("CC-006 Test Lucky Banner", async ({ page }) => {

  const coffeeCart = new CoffeeCartPage(page);

  const luckyBanner = "It's your lucky day! Get an extra cup of Mocha for $4.";

  await coffeeCart.clickOnEspresso();
  await coffeeCart.clickOnEspresso();
  await coffeeCart.clickOnEspresso();

  await expect(page.locator("#app")).toContainText(luckyBanner);
});

test("CC-007 Test Closing Cart with Full Items", async ({ page }) => {

  const coffeeCart = new CoffeeCartPage(page);

  const closeBtn = page.locator('[class="close"]');
  const totalPrice = "Total: $10.00";
  const checkout = page.locator('[data-test="checkout"]');

  await coffeeCart.clickOnEspresso();
  await coffeeCart.openCart();
  await closeBtn.click();

  await expect(checkout).toContainText(totalPrice);
});

test("CC-008 Total Price All Items", async ({ page }) => {
  const coffeeCart = new CoffeeCartPage(page);
  const totalPrice = "Total: $119.00";
  const checkout = page.locator('[data-test="checkout"]');
  const cupLocator = page.locator("//*[@class='cup-body' and @class != 'disabled-hover']");
  const cupAllLocators = await cupLocator.all();

  for (const cup of cupAllLocators) {
    await cup.click();
  }

  await expect(checkout).toContainText(totalPrice);
});
