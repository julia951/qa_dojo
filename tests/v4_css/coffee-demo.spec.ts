import { expect } from "@playwright/test";
import test, { chromium } from "@playwright/test";

//test 1
test('order Multiple Coffees', async () => {
  // Arrange
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://coffee-cart.app/', { waitUntil: 'networkidle' });

  // Act
  const espresso = page.locator('[data-test="Espresso"]');
  const macchiato = page.locator('[data-test="Espresso_Macchiato"]');
  const cappuccino = page.locator('[data-test="Cappuccino"]');
  const checkout = page.locator('[data-test="checkout"]');

  await espresso.click();
  await macchiato.click();
  await cappuccino.click();
  await checkout.click();

  await page.locator('[name="name"]').fill('Julka');
  await page.locator('[type="email"]').fill('julka@test.com');
  await page.locator("[aria-label='Promotion message']").check();
  await page.locator('[type="submit"]').click();

  // Assert
  await expect(page.locator('[class="snackbar success"]')).toContainText('Thanks for your purchase. Please check your email for payment.');
});

// test 2
test('Order By Plus Button', async () => {
  // Arrange
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://coffee-cart.app/', { waitUntil: 'networkidle' });

  const espresso = page.locator('[data-test="Espresso"]');
  const totalBtn = page.locator('[data-test="checkout"]');
  const addEspresso = page.locator('[aria-label="Add one Espresso"]');
  const checkout = page.locator('[data-test="checkout"]');

  await espresso.click();
  await totalBtn.hover();
  await addEspresso.click();
  await checkout.click();

  await page.locator('[name="name"]').fill('Julka');
  await page.locator('[type="email"]').fill('julka@test.com');
  await page.locator("[aria-label='Promotion message']").check();
  await page.locator('[type="submit"]').click();

  await expect(page.locator('[class="snackbar success"]')).toContainText('Thanks for your purchase. Please check your email for payment.'); 
});

// test 3
test('Visibility Of Cafe Latte Item', async () => {
  // Arrange
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://coffee-cart.app/', { waitUntil: 'networkidle' });

  const cafeLatte = page.locator('[data-test="Cafe_Latte"]');

  await expect(cafeLatte).toBeVisible();
});

// test 4
test('Flat White Total Price Calculation', async () => {
  // Arrange
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://coffee-cart.app/', { waitUntil: 'networkidle' });

  const flatWhite = page.locator('[data-test="Flat_White"]');
  const checkout = page.locator('[data-test="checkout"]');

  await flatWhite.click();

  await expect(checkout).toContainText('Total: $18.00');
});

//test 5
test('Promotion Message Visibility', async () => {
  // Arrange
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://coffee-cart.app/', { waitUntil: 'networkidle' });

  const mocha = page.locator('[data-test="Mocha"]');
  const checkout = page.locator('[data-test="checkout"]');

  await mocha.click();
  await checkout.click();

  const promotionMessage = page.locator("[aria-label='Promotion message']");

  await expect(promotionMessage).toContainText('I would like to receive order updates and promotional messages.');
});