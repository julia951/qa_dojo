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

async function flatWhiteClick(page: Page) {
  const flatWhite = page.locator('[data-test="Flat_White"]');
  await flatWhite.click();
}

test('CC-001 Test successful order Multiple Coffees', async () => {
 
  const successText = "Thanks for your purchase. Please check your email for payment.";

  const espresso = page.locator('[data-test="Espresso"]');
  const successMsg = page.locator('[class="snackbar success"]');

  espressoClick(page);
  espressoClick(page);
  espressoClick(page);
  openCart(page);
  purchase(page, usernameText, emailText);

  await expect(successMsg).toContainText(successText);
});


test('CC-002 Test successful Order By Plus Button', async () => {

  const successText = "Thanks for your purchase. Please check your email for payment.";

  const totalBtn = page.locator('[data-test="checkout"]');
  const addEspresso = page.locator('[aria-label="Add one Espresso"]');
  const successMsg = page.locator('[class="snackbar success"]');

  espressoClick(page);
  await totalBtn.hover();
  await addEspresso.click();

  openCart(page);

  purchase(page, usernameText, emailText);

  await expect(successMsg).toContainText(successText); 
});

test('CC-003 Test Visibility Of Cafe Latte Item', async () => {

  const cafeLatte = page.locator('[data-test="Cafe_Latte"]');

  await expect(cafeLatte).toBeVisible();
});

test('CC-004 Test Flat White Total Price Calculation', async () => {

  const flatWhiteTotal = 'Total: $18.00';

  const checkout = page.locator('[data-test="checkout"]');

  flatWhiteClick(page);

  await expect(checkout).toContainText(flatWhiteTotal);
});


test('CC-005 Test CheckBox Message Visibility', async () => {

  const promotionMessage = page.locator("[aria-label='Promotion message']");
  const promoMsg = 'I would like to receive order updates and promotional messages.';

  espressoClick(page);

  await openCart(page);

  await expect(promotionMessage).toContainText(promoMsg);
});