import { test, expect, chromium, Browser, BrowserContext, Page } from "@playwright/test";
import { HomePage } from "./Home.Page";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let homePage: HomePage;

test.beforeEach(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
  await homePage.navigate();
});

test.afterEach(async () => {
  await browser.close();
});

test("PWD-001 Test GetStarted Link Visibility", async () => {
  const getStartedLink = page.locator('a[class="getStarted_Sjon"]');
  await expect(getStartedLink).toBeVisible();
});

test("PWD-002 Test Banner Contains GetStarted Text", async () => {
  const headerText = "Get started";
  const headerLink = page.locator("header");
  await expect(headerLink).toContainText(headerText);
});

test("PWD-003 Test Search Input Value", async () => {
  const searchText = "browser";
  await homePage.performSearch(searchText);
  await expect(homePage.searchInput).toHaveValue(searchText);
});

test("PWD-004 Test NoResults For Search", async () => {
  const searchNotExistText = "kovbasa";
  await homePage.performSearch(searchNotExistText);
  await expect(page.locator("body")).toContainText(`No results for "${searchNotExistText}"`);
});

test("PWD-005 Test Docs Page Navigation", async () => {
  await homePage.clickIntro();
  await expect(homePage.headerLink).toContainText("Installation");
});

test("PWD-007 Test API Page Navigation", async () => {
  await homePage.apiLink.click();
  await expect(homePage.headerLink).toContainText("Playwright Library");
});

test("PWD-009 Test Programming Languages->Java Navigation", async () => {
  const languageDropdownLocator = page.locator('a[class="navbar__link"]'); 
  await languageDropdownLocator.hover(); 

  await homePage.navigateToLanguage("java");
  await expect(page.locator('a[class="navbar__link"]')).toContainText("Java");
});

test("PWD-013 Footer->Getting started Page Navigation", async () => {
  await homePage.navigateToFooterLink("Getting started");
  await expect(page.locator("header")).toContainText("Installation");
});
