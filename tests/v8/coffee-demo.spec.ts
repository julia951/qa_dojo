import { test, expect, chromium, Browser, BrowserContext, Page } from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let page: Page;

const usernameText = "Julka";
const emailText = "julka@test.com";

test.beforeEach(async () => {

  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://coffee-cart.app/', { waitUntil: 'networkidle' });
});

test.afterEach(async () => {

  await browser.close();
});

async function purchase(page:Page, usernameText:string, emailText:string) {

  const nameInput = page.locator('[name="name"]');
  const emailInput = page.locator('[type="email"]');
  const promoMsg = page.locator('[aria-label="Promotion message"]');
  const submitBtn = page.locator('[type="submit"]');

  await nameInput.fill(usernameText);
  await emailInput.fill(emailText);
  await promoMsg.check();
  await submitBtn.click();
}

async function openCart(page: Page) {

  const checkoutBtn = page.locator('[data-test="checkout"]');
  await checkoutBtn.click();
}

async function espressoClick(page: Page) {
  const espresso = page.locator('[data-test="Espresso"]');
  await espresso.click();
}

async function espressoRemove(page: Page) {
  const deleteEspresso = page.locator('[aria-label="Remove one Espresso"]');
  await deleteEspresso.click();
}

async function hoverCheckout(page: Page) {
  const totalBtn = page.locator('[data-test="checkout"]');
  await totalBtn.hover();
}

async function openCartTab(page: Page) {
  const cartTab = page.locator('[aria-label="Cart page"]');
  await cartTab.click();
}

async function clickRemoveIcon(page: Page) {
  const deleteIcon = page.locator('[aria-label="Remove all Espresso"]');
  await deleteIcon.click();
}

test('CC-001 Test successful order espresso Coffees', async () => {
 
  const successText = "Thanks for your purchase. Please check your email for payment.";

  const successMsg = page.locator('[class="snackbar success"]');

  espressoClick(page);
  openCart(page);
  purchase(page, usernameText, emailText);

  await expect(successMsg).toContainText(successText);
});

test('CC-002 Test successful order Multiple Coffees', async () => {
 
  const successText = "Thanks for your purchase. Please check your email for payment.";

  const successMsg = page.locator('[class="snackbar success"]');

  espressoClick(page);
  espressoClick(page);
  espressoClick(page);
  openCart(page);
  purchase(page, usernameText, emailText);

  await expect(successMsg).toContainText(successText);
});

test('CC-003 Test Changing items By Plus Button', async () => {

  const totalPtice = 'Total: $20.00';
  const checkout = page.locator('[data-test="checkout"]');
  const quantityText = page.locator('[class="unit-desc"]');

  espressoClick(page);
  espressoClick(page);
  hoverCheckout(page);
  
  await expect(checkout).toContainText(totalPtice);
  await expect(quantityText).toContainText('x 2');
});

test('CC-004 Test Deleting Item from Cart Usign -', async () => {

  const zeroTotalPrice = 'Total: $0.00';
  const checkout = page.locator('[data-test="checkout"]');

  await espressoClick(page);
  await hoverCheckout(page);
  await espressoRemove(page);

  await expect(checkout).toContainText(zeroTotalPrice);
});

test('CC-005 Test Deleting Item from Cart Tab', async () => {
  const deleteIcon = page.locator('[class="list"]');

  await espressoClick(page);
  await openCartTab(page);
  await clickRemoveIcon(page);

  await expect(deleteIcon).toContainText('No coffee, go add some.');

});

test('CC-006 Test Lucky Banner', async () => {
  const luckyBanner = 'It\'s your lucky day! Get an extra cup of Mocha for $4.';

  await espressoClick(page);
  await espressoClick(page);
  await espressoClick(page);

  await expect(page.locator('#app')).toContainText(luckyBanner);
});

test('CC-007 Test Closing Cart with Full Items', async () => {

  const closeBtn = page.locator('[class="close"]');
  const totalPtice = 'Total: $10.00';
  const checkout = page.locator('[data-test="checkout"]');

  await espressoClick(page);
  await openCart(page);
  await closeBtn.click();

  await expect(checkout).toContainText(totalPtice);
});