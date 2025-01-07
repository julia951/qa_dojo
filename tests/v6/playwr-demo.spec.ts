import { test, expect, chromium } from '@playwright/test';

let browser, context, page;

test.beforeEach(async () => {

  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
});

test.afterEach(async () => {

  await browser.close();
});

test('PWD-001 Test GetStarted Link Visibility', async () => {

  const getStartedLink = page.locator('a[class="getStarted_Sjon"]');

  await expect(getStartedLink).toBeVisible();
});

test('PWD-002 Test Banner Contains GetStarted Text', async () => {

  const headerText = 'Get started';

  const headerLink = page.locator('header');

  await expect(headerLink).toContainText(headerText);
});


test('PWD-003 Test Search Input Value', async () => {

  const searchText = 'browser'; 

  const docSearchBtn = page.locator('div[class="navbarSearchContainer_Bca1"]');
  const searchInput = page.locator('input[placeholder="Search docs"]');

  await docSearchBtn.click();
  await searchInput.fill(searchText);

  await expect(searchInput).toHaveValue(searchText);
});

test('PWD-004 Test Programming Languages Text Visibility', async () => {

  const expectedItems = ['Node.js', 'Python', 'Java', '.NET'];

  const languageDropdown =  page.locator('text=Node.js').first()
  const dropdownItems = page.locator('.dropdown__menu li a');

  await languageDropdown.hover();

  const itemTexts = await dropdownItems.allTextContents();

  expect(itemTexts).toEqual(expectedItems);
});


test('PWD-005 Test NoResults For Search', async () => {

  const searchNotExistText = 'kovbasa';
  const searchNotExistResultText = `No results for "${searchNotExistText}"`;


  const docSearchButton = page.locator('button[class="DocSearch DocSearch-Button"]');
  const searchInput = page.locator('input[placeholder="Search docs"]');
  const body = page.locator('body');

  await docSearchButton.click();
  await searchInput.fill(searchNotExistText);

  await expect(body).toContainText(searchNotExistResultText);
});

test('PWD-006 Test WritingTests Page Navigation', async () => {

  const writingTestsText = 'Writing tests';

  const introLink = page.locator('a[href="/docs/intro"]');
  const writingTestsLink = page.locator('a[href="/docs/writing-tests"]');
  const headerLink = page.locator('h1');

  await introLink.first().click();
  await writingTestsLink.first().click();

  await expect(headerLink).toContainText(writingTestsText);
});
