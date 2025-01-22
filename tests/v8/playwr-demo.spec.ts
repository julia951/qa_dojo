import { test, expect, chromium, Browser, BrowserContext, Page } from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeEach(async () => {

  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
});

test.afterEach(async () => {

  await browser.close();
});

async function performSearch(page: Page, searchText: string) {

  const searchButton = page.locator('input[class="DocSearch-Input"]');
  const searchInput = page.locator('input[placeholder="Search docs"]');

  await searchButton.click();
  await searchInput.fill(searchText);
}

async function clickIntro(page: Page) {

  const introLink = page.locator('a[href="/docs/intro"]');

  await introLink.first().click();
}

async function navigateToFooterLink(page: Page, linkText: string) {

  const footerLink = page.locator(`//a[@class="footer__link-item" and text()="${linkText}"]`);
  
  await footerLink.click();
}

async function hoverAndGetDropdownItems(page: Page, dropdownText: string) {
  const dropdown = page.locator(`text=${dropdownText}`).first();
  const dropdownItems = page.locator('.dropdown__menu li a');
  
  await dropdown.hover();
  return await dropdownItems.allTextContents();
}

async function navigateToLanguage(page: Page, language: string) {

  const languageDropdown = page.locator(`text=Node.js`).first();
  const languageLink = page.locator(`a[href="/${language.toLowerCase()}/"]`);
  
  await languageDropdown.hover();
  await languageLink.click();
  
  const navbarLink = page.locator(`a[class="navbar__link"]`);
}

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

  performSearch(page, searchText);

  await expect(searchInput).toHaveValue(searchText);
});

test('PWD-004 Test NoResults For Search', async () => {

  const searchNotExistText = 'kovbasa';
  const searchNotExistResultText = `No results for "${searchNotExistText}"`;

  const docSearchButton = page.locator('button[class="DocSearch DocSearch-Button"]');
  const body = page.locator('body');

  await docSearchButton.click();
  performSearch(page, searchNotExistText);

  await expect(body).toContainText(searchNotExistResultText);
});

test('PWD-005 Test Docs Page Navigation', async () => {

  const writingTestsText = 'Installation';
  const headerLink = page.locator('h1');

  await clickIntro(page); 

  await expect(headerLink).toContainText(writingTestsText);
});

test('PWD-006 Test Docs/WritingTests Page Navigation', async () => {

  const writingTestsText = 'Writing tests';

  const writingTestsLink = page.locator('a[href="/docs/writing-tests"]');
  const headerLink = page.locator('h1');

  await clickIntro(page); 
  await writingTestsLink.first().click();

  await expect(headerLink).toContainText(writingTestsText);
});

test('PWD-007 Test API Page Navigation', async () => {

  const playwrightLibraryText = 'Playwright Library';
  const headerLink = page.locator('h1');
  const apiLink = page.locator('a[href="/docs/api/class-playwright"]');

  await apiLink.click();

  await expect(headerLink).toContainText(playwrightLibraryText);
});

test('PWD-008 Test Programming Languages Text Visibility', async () => {

  const expectedItems = ['Node.js', 'Python', 'Java', '.NET'];
  const dropdownItems = page.locator('.dropdown__menu li a');
  const itemTexts = await dropdownItems.allTextContents();

  await hoverAndGetDropdownItems(page, 'Node.js');

  expect(itemTexts).toEqual(expectedItems);
});

test('PWD-009 Test Programming Languages->Java Navigation', async () => {

  const linkTexts = page.locator('a[class="navbar__link"]');
  const javaText = 'Java';

  await navigateToLanguage(page, javaText);

  await expect(linkTexts).toContainText(javaText);
});

test('PWD-010 Test Programming Languages->Python Navigation', async () => {

  const linkTexts = page.locator('a[class="navbar__link"]');

  await navigateToLanguage(page, "Python");

  await expect(linkTexts).toContainText("Python");
});

test('PWD-011 Test Programming Languages->.NET Navigation', async () => {

  const linkTexts = page.locator('a[class="navbar__link"]');

  await navigateToLanguage(page, 'dotnet');

  await expect(linkTexts).toContainText(".NET");
});

test('PWD-012 Test Community Page Navigation', async () => {

  const writingTestsText = 'Welcome';
  const headerLink = page.locator('h1');

  const apiLink = page.locator('a[href="/community/welcome"]');

  await apiLink.click();

  await expect(headerLink).toContainText(writingTestsText);
});

test('PWD-013 Footer->Getting started Page Navigation', async () => {

  const getStartedText = "Getting started";
  const headerText = 'Installation';
  const headerLink = page.locator('header');

  await navigateToFooterLink(page, getStartedText);

  await expect(headerLink).toContainText(headerText);
});

test('PWD-014 Footer->Learn Videos Page Navigation', async () => {

  const learnVideosText = 'Learn Videos';
  const headerLink = page.locator('h1');

  await navigateToFooterLink(page, learnVideosText);

  await expect(headerLink).toContainText(learnVideosText);
});

test('PWD-015 Footer->Feature Videos Page Navigation', async () => {

  const featureVideosText = 'Feature Videos';
  const headerLink = page.locator('h1');

  await await navigateToFooterLink(page, featureVideosText);

  await expect(headerLink).toContainText(featureVideosText);
});

test('PWD-016 Landing->Typescipt Page Navigation', async () => {

  const landingTypesciptLink = page.locator('//a[@href="https://playwright.dev/docs/intro" and text()="TypeScript"]');
  const headerText = 'Installation';
  const headerLink = page.locator('h1');

  await landingTypesciptLink.click();

  await expect(headerLink).toContainText(headerText);

  const languageDropdown =  page.locator('//a[@class="navbar__link" and text()="Node.js"]');

  await expect(languageDropdown).toContainText("Node.js");
});

test('PWD-017 Landing->JavaScript Page Navigation', async () => {

  const landingJavaScriptLink = page.locator('//a[@href="https://playwright.dev/docs/intro" and text()="TypeScript"]');
  const headerText = 'Installation';
  const headerLink = page.locator('h1');

  await landingJavaScriptLink.click();

  await expect(headerLink).toContainText(headerText);

  const languageDropdown =  page.locator('//a[@class="navbar__link" and text()="Node.js"]');

  await expect(languageDropdown).toContainText("Node.js");
});

test('PWD-018 Landing->Python Page Navigation', async () => {

  const landingPythonScriptLink = page.locator('//a[@href="https://playwright.dev/python/docs/intro"]');
  const headerText = 'Installation';
  const headerLink = page.locator('h1');

  await landingPythonScriptLink.click();

  await expect(headerLink).toContainText(headerText);

  const languageDropdown =  page.locator('//a[@class="navbar__link" and text()="Python"]');

  await expect(languageDropdown).toContainText("Python");

});

test('PWD-019 Landing->.NET Page Navigation', async () => {

  const landingPythonScriptLink = page.locator('//a[@href="https://playwright.dev/dotnet/docs/intro"]');
  const headerText = 'Installation';
  const headerLink = page.locator('h1');

  await landingPythonScriptLink.click();

  await expect(headerLink).toContainText(headerText);

  const languageDropdown =  page.locator('//a[@class="navbar__link" and text()=".NET"]');

  await expect(languageDropdown).toContainText(".NET");

});

test('PWD-019 Landing->Java Page Navigation', async () => {

  const landingPythonScriptLink = page.locator('//a[@href="https://playwright.dev/java/docs/intro"]');
  const headerText = 'Installation';
  const headerLink = page.locator('h1');

  await landingPythonScriptLink.click();

  await expect(headerLink).toContainText(headerText);

  const languageDropdown =  page.locator('//a[@class="navbar__link" and text()="Java"]');

  await expect(languageDropdown).toContainText("Java");

});