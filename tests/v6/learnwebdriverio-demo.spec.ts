import { test, expect, chromium } from '@playwright/test';
import { time } from 'console';


let browser, context, page;

test.beforeEach(async () => {

  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://demo.learnwebdriverio.com/', { waitUntil: 'networkidle' });
});

test.afterEach(async () => {

  await browser.close();
});

test('LWB-000 Test adding article', async () => {

  const articleNameText = "My First Article";
  const articleDescText = "My First Article Description";
  const articleLongDescText = "My First Article Description Playwright Demo";
  const articleTagText = "Playwright";
  const emailText = "yulka001@test.com";
  const pwdText = "yulka001";

  const signInLink = page.locator('//a[contains(text(), "Sign in")]');
  const pwdInput = page.locator('//input[@type="password"]');
  const emailInput = page.locator('//input[@type="email"]');
  const signInBtn = page.locator('//button[contains(text(), "Sign in")]');
  const addArticleBtn = page.locator('//a[contains(text(), "New Article")]');
  const titleInput = page.locator('//input[@data-qa-id="editor-title"]');
  const descriptionInput = page.locator('//input[@data-qa-id="editor-description"]');
  const longDescriptionInput = page.locator('//textarea[contains(@class, "auto-textarea-input")]');
  const tagsInput = page.locator('//*[@data-qa-id="editor-tags"]');
  const createArticleBtn = page.locator('//*[@data-qa-id="editor-publish"]');
  const articleTitle = page.locator('//*[@data-qa-id="article-title"]');

  await signInLink.click();
  await emailInput.fill(emailText);
  await pwdInput.fill(pwdText);
  await signInBtn.click();
  await addArticleBtn.click();
  await titleInput.fill(articleNameText);
  await descriptionInput.fill(articleDescText);
  await longDescriptionInput.fill(articleLongDescText);
  await tagsInput.fill(articleTagText);
  await createArticleBtn.click();

  await expect(articleTitle).toContainText(articleNameText);

  //await page.waitForTimeout(2000);
});

test('LWB-001 Test searching elements by text article', async () => {
  const signInText = "Sign in";
  const signInBtn = page.locator('//a[contains(text(), "Sign in")]');
  const headerText = "conduit";
  const headerLocator = page.locator('//h1[contains(text(), "conduit")]');
  const homeNavMenuText = "Home";
  const homeNavMenuLocator = page.locator('//a[contains(text(), "Home")]');
  const paragraphText = "A place to share your knowledge.";
  const paragraphLocator = page.locator('//p[contains(text(), "A place to share your knowledge.")]');

  await expect(headerLocator).toContainText(headerText);
  await expect(homeNavMenuLocator).toContainText(homeNavMenuText);
  await expect(signInBtn).toContainText(signInText);
  await expect(paragraphLocator).toContainText(paragraphText);
});

test('LWB-002 Test searching elements by attributes', async () => {

  const avatarsIcons = page.locator('img[@data-qa-type="author-avatar"]');
  const globalFeedTab = page.locator('//a[contains(@class, "nav-link") and contains(text(),"Global Feed")]');
  const likeBtns = page.locator('//button[@data-qa-type="article-favorite"]');
  const signUpBtn = page.locator('//a[@href="/register"]');
  const tagsBtns = page.locator('//li[contains(@class,"tag-pill")]');

  await expect(avatarsIcons).toBeVisible;
  await expect(globalFeedTab).toBeVisible;
  await expect(likeBtns).toBeVisible;
  await expect(signUpBtn).toBeVisible;
  await expect(tagsBtns).toBeVisible;
});

test('LWB-003 Test searching using contains', async () => {

  const readMoreBtns = page.locator('//span[contains(text(), "Read more...")]');
  const routerLink = page.locator('//a[contains(@class, "router-link")]');
  const btnsOutlinePrm = page.locator('//button[contains(@class, "btn-outline-primary")]');

  await expect(readMoreBtns).toBeVisible;
  await expect(routerLink).toBeVisible;
  await expect(btnsOutlinePrm).toBeVisible;
});

test('LWB-004 Test searching using starts-with()', async () => {

  const articles = page.locator('//*[starts-with(@href, "/articles")]');

  await expect(articles).toBeVisible;
});

test('LWB-005 Test searching using DOM', async () => {

  const avararsParentDiv = page.locator('//img[@data-qa-type="author-avatar"]/parent::a/parent::div');
  const articleTitle = page.locator('//a[@class="preview-link"]/descendant::h1');
  const aInUl = page.locator('//ul/descendant::a');
  const bannerFirstSibling = page.locator("//div[@class='banner']/following-sibling::*[1]");
  const divs = page.locator('//div[@class="home-global"]/div');

  await expect(avararsParentDiv).toBeVisible;
  await expect(articleTitle).toBeVisible;
  await expect(aInUl).toBeVisible;
  await expect(bannerFirstSibling).toBeVisible;
  await expect(divs).toBeVisible;
});

test('LWB-006 Test searching using `normalize-space()` та `text()', async () => {

  const signUpLink = await page.locator('//a[normalize-space(text())="Sign up"]');
  const demoSpan = await page.locator('//span[normalize-space(text())="demo"]');

  await expect(signUpLink).toBeVisible;
  await expect(demoSpan).toBeVisible;
});

test('LWB-007 Test searching using `AND` та `OR', async () => {

  const buttons = await page.locator('//button[contains(@class, "btn-outline-primary") and @data-qa-type]');
  const tagsBtns = page.locator('//li[contains(@class,"tag-pill") or contains(text(), "testing")]');

  await expect(buttons).toBeVisible;
  await expect(tagsBtns).toBeVisible;
});

test('LWB-008 Test searching using `not', async () => {

  const btns = await page.locator('//button[not(contains(@class, "btn-outline-primary"))]');

  await expect(btns).toBeVisible;
});
