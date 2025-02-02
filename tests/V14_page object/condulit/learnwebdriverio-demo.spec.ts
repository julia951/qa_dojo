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

test("LWB-000 Test adding article", async () => {
  await homePage.login("conduit@conduit.com", "conduit");
  await homePage.addArticle("My First Article", "My First Article Description", "My First Article Description Playwright Demo", "Playwright");

  await expect(homePage.articleTitle).toContainText("My First Article");
});

test("LWB-001 Test searching elements by text article", async () => {
  await expect(homePage.headerLocator).toContainText("conduit");
  await expect(homePage.homeNavMenuLocator).toContainText("Home");
  await expect(homePage.signInLink).toContainText("Sign in");
  await expect(homePage.paragraphLocator).toContainText("A place to share your knowledge.");
});

test("LWB-002 Test searching elements by attributes", async () => {

  for (let i = 0; i < await homePage.avatarsIcons.count(); i++) {
    await expect(homePage.avatarsIcons.nth(i)).toBeVisible();
}

  await expect(homePage.globalFeedTab).toBeVisible();

 for (let i = 0; i < await homePage.likeBtns.count(); i++) {
  await expect(homePage.likeBtns.nth(i)).toBeVisible();
}

  await expect(homePage.signUpBtn).toBeVisible();

  for (let i = 0; i < await homePage.tagsBtns.count(); i++) {
    await expect(homePage.tagsBtns.nth(i)).toBeVisible();
  }
});

test("LWB-003 Test searching using contains", async () => {
 
  for (let i = 0; i < await homePage.readMoreBtns.count(); i++) {
    await expect(homePage.readMoreBtns.nth(i)).toBeVisible();
}

  for (let i = 0; i < await homePage.routerLink.count(); i++) {
    await expect(homePage.routerLink.nth(i)).toBeVisible();
}

  for (let i = 0; i < await homePage.btnsOutlinePrm.count(); i++) {
    await expect(homePage.btnsOutlinePrm.nth(i)).toBeVisible();
}
});

test("LWB-004 Test searching using starts-with()", async () => {

  for (let i = 0; i < await homePage.articles.count(); i++) {
    await expect(homePage.articles.nth(i)).toBeVisible();
}
});

test("LWB-005 Test searching using DOM", async () => {

  for (let i = 0; i < await homePage.avararsParentDiv.count(); i++) {
    await expect(homePage.avararsParentDiv.nth(i)).toBeVisible();
}

  for (let i = 0; i < await homePage.articleTitleDOM.count(); i++) {
    await expect(homePage.articleTitleDOM.nth(i)).toBeVisible();
}

  for (let i = 0; i < await homePage.aInUl.count(); i++) {
    await expect(homePage.aInUl.nth(i)).toBeVisible();
}
  await expect(homePage.bannerFirstSibling).toBeVisible();
  await expect(homePage.divs).toBeVisible();
});

test("LWB-006 Test searching using normalize-space()", async () => {
  await expect(homePage.signUpLink).toBeVisible();
  await expect(homePage.demoSpan).toBeVisible();
});

test("LWB-007 Test searching using AND та OR", async () => {

  for (let i = 0; i < await homePage.buttons.count(); i++) {
    await expect(homePage.buttons.nth(i)).toBeVisible();
}

  for (let i = 0; i < await homePage.tagsBtns.count(); i++) {
    await expect(homePage.tagsBtns.nth(i)).toBeVisible();
}
});
