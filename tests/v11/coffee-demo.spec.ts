import test, { expect, chromium, Browser, BrowserContext, Page } from "@playwright/test";

const usernameText = "Julka";
const emailText = "julka@test.com";

function createPageObject(page: Page) {
  const someObj = {
    page: page,
    clickOnEspresso: async function () {
      await page.locator('[data-test="Espresso"]').click();
    },
    clickOnCheckout: async function () {
      await page.locator('input[type="checkbox"]').click();
    },
    openCart: async function () {
      await page.locator('[data-test="checkout"]').click();
    },
    espressoRemove: async function () {
      await page.locator('[aria-label="Remove one Espresso"]').click();
    },
    hoverCheckout: async function () {
      await page.locator('[data-test="checkout"]').hover();
    },
    openCartTab: async function () {
      await page.locator('[aria-label="Cart page"]').click();
    },
    clickRemoveIcon: async function () {
      await page.locator('[aria-label="Remove all Espresso"]').click();
    },
    purchase: async function () {
      await page.locator('[name="name"]').fill(usernameText);
      await page.locator('[type="email"]').fill(emailText);
      await page.locator('[aria-label="Promotion message"]').check();
      await page.locator('[type="submit"]').click();
    },
  }
  return someObj;
}

test.beforeEach(async ({ page }) => {
  await page.goto('https://coffee-cart.app/', { waitUntil: 'networkidle' });
});

test('CC-001 Test successful order espresso Coffee', async ({ page }) => {

  const pageObject = createPageObject(page);

  const successText = "Thanks for your purchase. Please check your email for payment.";
  const successMsg = page.locator('[class="snackbar success"]');

  await pageObject.clickOnEspresso();
  await pageObject.openCart();
  await pageObject.purchase();

  await expect(successMsg).toContainText(successText);
});

test('CC-002 Test successful order Multiple Coffees', async ({ page }) => {

  const pageObject = createPageObject(page);

  const successText = "Thanks for your purchase. Please check your email for payment.";
  const successMsg = page.locator('[class="snackbar success"]');

  await pageObject.clickOnEspresso();
  await pageObject.clickOnEspresso();
  await pageObject.clickOnEspresso();
  await pageObject.openCart();
  await pageObject.purchase();

  await expect(successMsg).toContainText(successText);
});

test('CC-003 Test Changing items By Plus Button', async ({ page }) => {

  const pageObject = createPageObject(page);

  const totalPtice = 'Total: $20.00';
  const checkout = page.locator('[data-test="checkout"]');
  const quantityText = page.locator('[class="unit-desc"]');

  await pageObject.clickOnEspresso();
  await pageObject.clickOnEspresso();
  await pageObject.hoverCheckout();

  await expect(checkout).toContainText(totalPtice);
  await expect(quantityText).toContainText('x 2');
});

test('CC-004 Test Deleting Item from Cart Usign -', async ({ page }) => {

  const pageObject = createPageObject(page);

  const zeroTotalPrice = 'Total: $0.00';
  const checkout = page.locator('[data-test="checkout"]');

  await pageObject.clickOnEspresso();
  await pageObject.hoverCheckout();
  await pageObject.espressoRemove();

  await expect(checkout).toContainText(zeroTotalPrice);
});

test('CC-005 Test Deleting Item from Cart Tab', async ({ page }) => {

  const pageObject = createPageObject(page);

  const deleteIcon = page.locator('[class="list"]');

  await pageObject.clickOnEspresso();
  await pageObject.openCartTab();
  await pageObject.clickRemoveIcon();

  await expect(deleteIcon).toContainText('No coffee, go add some.');
});

test('CC-006 Test Lucky Banner', async ({ page }) => {

  const pageObject = createPageObject(page);

  const luckyBanner = 'It\'s your lucky day! Get an extra cup of Mocha for $4.';

  await pageObject.clickOnEspresso();
  await pageObject.clickOnEspresso();
  await pageObject.clickOnEspresso();

  await expect(page.locator('#app')).toContainText(luckyBanner);
});

test('CC-007 Test Closing Cart with Full Items', async ({ page }) => {

  const pageObject = createPageObject(page);

  const closeBtn = page.locator('[class="close"]');
  const totalPtice = 'Total: $10.00';
  const checkout = page.locator('[data-test="checkout"]');

  await pageObject.clickOnEspresso();
  await pageObject.openCart();
  await closeBtn.click();

  await expect(checkout).toContainText(totalPtice);
});


test('CC-008 Total Price All Items', async ({ page }) => {;

  const pageObject = createPageObject(page);

  const totalPtice = 'Total: $119.00';
  const checkout = page.locator('[data-test="checkout"]');
  const cupLocator = page.locator("//*[@class='cup-body' and @class != 'disabled-hover']");
  const cupAllLocators = await cupLocator.all();

  for (const cupLocator of cupAllLocators) {
    await cupLocator.click();
  }

  await expect(checkout).toContainText(totalPtice);
}); 