import { test, expect } from '@playwright/test';

//test 1
test('testPurchaseMultipleCoffees', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="checkout"]').click();

  await page.getByLabel('Name').fill('Julka');
  await page.getByLabel('Email').fill('julka@test.com');
  await page.getByLabel('Promotion checkbox').check();
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');

});

//test 2
test('tesOrderByPlusButton', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Espresso"]').click();
  await page.getByLabel('Add one Espresso').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('yulika');
  await page.getByLabel('Name').press('Tab');
  await page.getByLabel('Email').fill('uilika@test.com');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');

});

//test 3
test('testVisibilityOfCafeLatteItem', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await expect(page.locator('[data-test="Cafe_Latte"]')).toBeVisible();
});

//test 4
test('testFlatWhiteTotalPriceCalculation', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Flat_White"]').click();

  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $18.00');
});

//test 5
test('testPromotionMessage', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Mocha"]').click();
  await page.locator('[data-test="checkout"]').click();
  
  await expect(page.getByLabel('Promotion message')).toContainText('I would like to receive order updates and promotional messages.');
});