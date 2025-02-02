import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly signInLink: Locator;
  readonly emailInput: Locator;
  readonly pwdInput: Locator;
  readonly signInBtn: Locator;
  readonly addArticleBtn: Locator;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly longDescriptionInput: Locator;
  readonly tagsInput: Locator;
  readonly createArticleBtn: Locator;
  readonly articleTitle: Locator;
  readonly headerLocator: Locator;
  readonly homeNavMenuLocator: Locator;
  readonly paragraphLocator: Locator;
  readonly signUpBtn: Locator;
  readonly globalFeedTab: Locator;
  readonly avatarsIcons: Locator;
  readonly likeBtns: Locator;
  readonly tagsBtns: Locator;
  readonly readMoreBtns: Locator;
  readonly routerLink: Locator;
  readonly btnsOutlinePrm: Locator;
  readonly articles: Locator;
  readonly avararsParentDiv: Locator;
  readonly articleTitleDOM: Locator;
  readonly aInUl: Locator;
  readonly bannerFirstSibling: Locator;
  readonly divs: Locator;
  readonly signUpLink: Locator;
  readonly demoSpan: Locator;
  readonly buttons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.locator('//a[contains(text(), "Sign in")]');
    this.emailInput = page.locator('//input[@type="email"]');
    this.pwdInput = page.locator('//input[@type="password"]');
    this.signInBtn = page.locator('//button[contains(text(), "Sign in")]');
    this.addArticleBtn = page.locator('//a[contains(text(), "New Article")]');
    this.titleInput = page.locator('//input[@data-qa-id="editor-title"]');
    this.descriptionInput = page.locator('//input[@data-qa-id="editor-description"]');
    this.longDescriptionInput = page.locator('//textarea[contains(@class, "auto-textarea-input")]');
    this.tagsInput = page.locator('//*[@data-qa-id="editor-tags"]');
    this.createArticleBtn = page.locator('//*[@data-qa-id="editor-publish"]');
    this.articleTitle = page.locator('//*[@data-qa-id="article-title"]');
    this.headerLocator = page.locator('//h1[contains(text(), "conduit")]');
    this.homeNavMenuLocator = page.locator('//a[contains(text(), "Home")]');
    this.paragraphLocator = page.locator('//p[contains(text(), "A place to share your knowledge.")]');
    this.signUpBtn = page.locator('//a[@href="/register"]');
    this.globalFeedTab = page.locator('//a[contains(@class, "nav-link") and contains(text(),"Global Feed")]');
    this.avatarsIcons = page.locator('//img[@data-qa-type="author-avatar"]');
    this.likeBtns = page.locator('//button[@data-qa-type="article-favorite"]');
    this.tagsBtns = page.locator('//li[contains(@class,"tag-pill")]');
    this.readMoreBtns = page.locator('//span[contains(text(), "Read more...")]');
    this.routerLink = page.locator('//a[contains(@class, "router-link")]');
    this.btnsOutlinePrm = page.locator('//button[contains(@class, "btn-outline-primary")]');
    this.articles = page.locator('//*[starts-with(@href, "/articles")]');
    this.avararsParentDiv = page.locator('//img[@data-qa-type="author-avatar"]/parent::a/parent::div');
    this.articleTitleDOM = page.locator('//a[@class="preview-link"]/descendant::h1');
    this.aInUl = page.locator('//ul/descendant::a');
    this.bannerFirstSibling = page.locator("//div[@class='banner']/following-sibling::*[1]");
    this.divs = page.locator('//div[@class="home-global"]/div');
    this.signUpLink = page.locator('//a[normalize-space(text())="Sign up"]');
    this.demoSpan = page.locator('//span[normalize-space(text())="demo"]');
    this.buttons = page.locator('//button[contains(@class, "btn-outline-primary") and @data-qa-type]');
  }

  async navigate() {
    await this.page.goto("https://demo.learnwebdriverio.com/", { waitUntil: "networkidle" });
  }

  async login(email: string, password: string) {
    await this.signInLink.click();
    await this.emailInput.fill(email);
    await this.pwdInput.fill(password);
    await this.signInBtn.click();
  }

  async addArticle(title: string, desc: string, longDesc: string, tag: string) {
    await this.addArticleBtn.click();
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(desc);
    await this.longDescriptionInput.fill(longDesc);
    await this.tagsInput.fill(tag);
    await this.createArticleBtn.click();
  }
}
