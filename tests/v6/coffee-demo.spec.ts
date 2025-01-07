import { expect } from "@playwright/test";
import test, { chromium } from "@playwright/test";

let browser, context, page;

test.beforeEach(async () => {

  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://coffee-cart.app/', { waitUntil: 'networkidle' });
});

test.afterEach(async () => {

  await browser.close();
});

test('CC-001 Test successful order Multiple Coffees', async () => {
 
  const usernameText = "Julka";
  const emailText = "julka@test.com";
  const successText = "Thanks for your purchase. Please check your email for payment.";

  const espresso = page.locator('[data-test="Espresso"]');
  const macchiato = page.locator('[data-test="Espresso_Macchiato"]');
  const cappuccino = page.locator('[data-test="Cappuccino"]');
  const checkout = page.locator('[data-test="checkout"]');
  const nameInput = page.locator('[name="name"]');
  const emailInput = page.locator('[type="email"]');
  const promoMsg = page.locator('[aria-label="Promotion message"]');
  const submitBtn = page.locator('[type="submit"]');
  const successMsg = page.locator('[class="snackbar success"]');

  await espresso.click();
  await macchiato.click();
  await cappuccino.click();
  await checkout.click();
  await nameInput.fill(usernameText);
  await emailInput.fill(emailText);
  await promoMsg.check();
  await submitBtn.click();

  await expect(successMsg).toContainText(successText);
});


test('CC-002 Test successful Order By Plus Button', async () => {

  const usernameText = "Julka";
  const emailText = "julka@test.com";
  const successText = "Thanks for your purchase. Please check your email for payment.";

  const espresso = page.locator('[data-test="Espresso"]');
  const totalBtn = page.locator('[data-test="checkout"]');
  const addEspresso = page.locator('[aria-label="Add one Espresso"]');
  const checkout = page.locator('[data-test="checkout"]');
  const nameInput = page.locator('[name="name"]');
  const emailInput = page.locator('[type="email"]');
  const promoCheckbox = page.locator('[aria-label="Promotion message"]');
  const submitBtn = page.locator('[type="submit"]');
  const successMsg = page.locator('[class="snackbar success"]');

  await espresso.click();
  await totalBtn.hover();
  await addEspresso.click();
  await checkout.click();

  await nameInput.fill(usernameText);
  await emailInput.fill(emailText);
  await promoCheckbox.check();
  await submitBtn.click();

  await expect(successMsg).toContainText(successText); 
});

test('CC-003 Test Visibility Of Cafe Latte Item', async () => {

  const cafeLatte = page.locator('[data-test="Cafe_Latte"]');

  await expect(cafeLatte).toBeVisible();
});

test('CC-004 Test Flat White Total Price Calculation', async () => {

  const flatWhiteTotal = 'Total: $18.00';

  const flatWhite = page.locator('[data-test="Flat_White"]');
  const checkout = page.locator('[data-test="checkout"]');

  await flatWhite.click();

  await expect(checkout).toContainText(flatWhiteTotal);
});


test('CC-005 Test Promotion Message Visibility', async () => {

  const promoMsg = 'I would like to receive order updates and promotional messages.';

  const mocha = page.locator('[data-test="Mocha"]');
  const checkout = page.locator('[data-test="checkout"]');
  const promotionMessage = page.locator("[aria-label='Promotion message']");

  await mocha.click();
  await checkout.click();

  await expect(promotionMessage).toContainText(promoMsg);
});