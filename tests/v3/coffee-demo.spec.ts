import { expect } from "@playwright/test";
import test, { chromium } from "@playwright/test";

//test 1
test('testPurchaseMultipleCoffees', async () => {
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

  await page.getByLabel('Name').fill('Julka');
  await page.getByLabel('Email').fill('julka@test.com');
  await page.getByLabel('Promotion checkbox').check();
  await page.getByRole('button', { name: 'Submit' }).click();

  // Assert
  await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');
});

// test 2
test('tesOrderByPlusButton', async () => {
  // Arrange
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://coffee-cart.app/', { waitUntil: 'networkidle' });

  const espresso = page.locator('[data-test="Espresso"]');
  const totalBtn = page.getByLabel('Proceed to checkout');
  const addEspresso = page.getByLabel('Add one Espresso');
  const checkout = page.locator('[data-test="checkout"]');

  await espresso.click();
  await totalBtn.hover();
  await addEspresso.click();
  await checkout.click();

  await page.getByLabel('Name').fill('yulika');
  await page.getByLabel('Email').fill('uilika@test.com');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.'); 
});

// test 3
test('testVisibilityOfCafeLatteItem', async () => {
  // Arrange
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://coffee-cart.app/', { waitUntil: 'networkidle' });

  const cafeLatte = page.locator('[data-test="Cafe_Latte"]');

  await expect(cafeLatte).toBeVisible();
});

// test 4
test('testFlatWhiteTotalPriceCalculation', async () => {
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
test('testPromotionMessage', async () => {
  // Arrange
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://coffee-cart.app/', { waitUntil: 'networkidle' });

  const mocha = page.locator('[data-test="Mocha"]');
  const checkout = page.locator('[data-test="checkout"]');

  await mocha.click();
  await checkout.click();

  const promotionMessage = page.getByLabel('Promotion message');

  await expect(promotionMessage).toContainText('I would like to receive order updates and promotional messages.');
});