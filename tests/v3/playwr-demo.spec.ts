import { test, expect, chromium } from '@playwright/test';

// test 1
test('testGetStartedLinkVisibility', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
});

// test 2
test('testBannerContainsGetStartedText', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

  await expect(page.getByRole('banner')).toContainText('Get started');
});

// test 3
test('testSearchInputValue', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search docs').fill('browser');

  await expect(page.getByPlaceholder('Search docs')).toHaveValue('browser');
});

// test 4
test('testDocsSidebarVisibility', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Docs' }).click();

  await expect(page.getByLabel('Docs sidebar')).toBeVisible();
});

// test 5
test('testProgrammingLanguagesTextVisibility', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

  const languageDropdown =  page.locator('text=Node.js').first()

  await languageDropdown.hover();

  await expect(page.getByText('Node.jsPythonJava.NET')).toBeVisible();
});

// test 6
test('testNoResultsForSearchQuery', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search docs').fill('kovbasa');

  await expect(page.locator('body')).toContainText('No results for "kovbasa"');
});

// test 7
test('testWritingTestsPageNavigation', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Docs' }).click();
  await page.getByRole('link', { name: 'Writing tests', exact: true }).click();

  await expect(page.locator('h1')).toContainText('Writing tests');
});
