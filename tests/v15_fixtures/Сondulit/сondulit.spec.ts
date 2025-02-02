import { test, expect, chromium, Browser, BrowserContext, Page } from "@playwright/test";
import { test as spec } from './fixture'


spec('Try to connect to call', async ({ condulitApp }) => {

  await condulitApp.navigate();

});

spec("LWB-000 Test adding article", async ({ condulitApp }) => {
  await condulitApp.navigate();
  await condulitApp.login("conduit@conduit.com", "conduit");
  await condulitApp.addArticle("My First Article", "My First Article Description", "My First Article Description Playwright Demo", "Playwright");

  await expect(condulitApp.articleTitle).toContainText("My First Article");
});

spec("LWB-001 Test searching elements by text article", async ({ condulitApp }) => {
  await condulitApp.navigate();

  await expect(condulitApp.headerLocator).toContainText("conduit");
  await expect(condulitApp.homeNavMenuLocator).toContainText("Home");
  await expect(condulitApp.signInLink).toContainText("Sign in");
  await expect(condulitApp.paragraphLocator).toContainText("A place to share your knowledge.");
});

spec("LWB-002 Test searching elements by attributes", async ({ condulitApp }) => {
  await condulitApp.navigate();
  for (let i = 0; i < await condulitApp.avatarsIcons.count(); i++) {
    await expect(condulitApp.avatarsIcons.nth(i)).toBeVisible();
  }
  await expect(condulitApp.globalFeedTab).toBeVisible();
  for (let i = 0; i < await condulitApp.likeBtns.count(); i++) {
    await expect(condulitApp.likeBtns.nth(i)).toBeVisible();
  }
  await expect(condulitApp.signUpBtn).toBeVisible();
  for (let i = 0; i < await condulitApp.tagsBtns.count(); i++) {
    await expect(condulitApp.tagsBtns.nth(i)).toBeVisible();
  }
});

spec("LWB-003 Test searching using contains", async ({ condulitApp }) => {
  await condulitApp.navigate();
  for (let i = 0; i < await condulitApp.readMoreBtns.count(); i++) {
    await expect(condulitApp.readMoreBtns.nth(i)).toBeVisible();
  }
  for (let i = 0; i < await condulitApp.routerLink.count(); i++) {
    await expect(condulitApp.routerLink.nth(i)).toBeVisible();
  }
  for (let i = 0; i < await condulitApp.btnsOutlinePrm.count(); i++) {
    await expect(condulitApp.btnsOutlinePrm.nth(i)).toBeVisible();
  }
});

spec("LWB-004 Test searching using starts-with()", async ({ condulitApp }) => {
  await condulitApp.navigate();

  for (let i = 0; i < await condulitApp.articles.count(); i++) {
    await expect(condulitApp.articles.nth(i)).toBeVisible();
  }
});

spec("LWB-005 Test searching using DOM", async ({ condulitApp }) => {
  await condulitApp.navigate();

  for (let i = 0; i < await condulitApp.avararsParentDiv.count(); i++) {
    await expect(condulitApp.avararsParentDiv.nth(i)).toBeVisible();
  }

  for (let i = 0; i < await condulitApp.articleTitleDOM.count(); i++) {
    await expect(condulitApp.articleTitleDOM.nth(i)).toBeVisible();
  }

  for (let i = 0; i < await condulitApp.aInUl.count(); i++) {
    await expect(condulitApp.aInUl.nth(i)).toBeVisible();
  }
  await expect(condulitApp.bannerFirstSibling).toBeVisible();
  await expect(condulitApp.divs).toBeVisible();
});

spec("LWB-006 Test searching using normalize-space()", async ({ condulitApp }) => {
  await condulitApp.navigate();

  await expect(condulitApp.signUpLink).toBeVisible();
  await expect(condulitApp.demoSpan).toBeVisible();
});

spec("LWB-007 Test searching using AND та OR", async ({ condulitApp }) => {
  await condulitApp.navigate();
  
  for (let i = 0; i < await condulitApp.buttons.count(); i++) {
    await expect(condulitApp.buttons.nth(i)).toBeVisible();
  }
  for (let i = 0; i < await condulitApp.tagsBtns.count(); i++) {
    await condulitApp.navigate();
    await expect(condulitApp.tagsBtns.nth(i)).toBeVisible();
  }
});
