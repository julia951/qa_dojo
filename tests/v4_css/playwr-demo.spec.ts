import { test, expect, chromium } from '@playwright/test';

// test 1
test('GetStarted Link Visibility', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

  await expect(page.locator('a[class="getStarted_Sjon"]')).toBeVisible();
});

// test 2
test('Banner Contains GetStarted Text', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

  await expect(page.locator('header')).toContainText('Get started');
});

// test 3
test('test Search Input Value', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

  await page.locator('button[class="DocSearch DocSearch-Button"]').click();
  await page.locator('input[placeholder="Search docs"]').fill('browser');

  await expect(page.locator('input[placeholder="Search docs"]')).toHaveValue('browser');
});

// test 4
test('DocsSidebar Visibility', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

  await page.locator('a[href="/docs/intro"]').first().click();

  await expect(page.locator('nav[aria-label="Docs sidebar"]')).toBeVisible();
});

// test 5
test('ProgrammingLanguages Text Visibility', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

  const languageDropdown =  page.locator('text=Node.js').first()

  await languageDropdown.hover();

  const dropdownItems = page.locator('.dropdown__menu li a');

  const itemTexts = await dropdownItems.allTextContents();

  const expectedItems = ['Node.js', 'Python', 'Java', '.NET'];

  expect(itemTexts).toEqual(expectedItems);
});

// test 6
test('NoResults For Search', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

  await page.locator('button[class="DocSearch DocSearch-Button"]').click();
    await page.locator('input[placeholder="Search docs"]').fill('kovbasa');

  await expect(page.locator('body')).toContainText('No results for "kovbasa"');
});

// test 7
test('WritingTests Page Navigation', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

  await page.locator('a[href="/docs/intro"]').first().click();
  await page.locator('a[href="/docs/writing-tests"]').first().click();

  await expect(page.locator('h1')).toContainText('Writing tests');
});
