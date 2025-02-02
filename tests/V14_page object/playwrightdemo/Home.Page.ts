import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly searchInput: Locator;
  readonly introLink: Locator;
  readonly headerLink: Locator;
  readonly footerLink: (text: string) => Locator;
  readonly apiLink: Locator;
  readonly languageDropdown: (language: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.locator('span[class="DocSearch-Button-Placeholder"]');
    this.searchInput = page.locator('input[placeholder="Search docs"]');
    this.introLink = page.locator('a[href="/docs/intro"]');
    this.headerLink = page.locator('h1');
    this.footerLink = (text: string) =>
      page.locator(`//a[@class="footer__link-item" and text()="${text}"]`);
    this.apiLink = page.locator('a[href="/docs/api/class-playwright"]');
    this.languageDropdown = (language: string) =>
      page.locator(`a[href="/${language.toLowerCase()}/"]`);
  }

  async navigate() {
    await this.page.goto("https://playwright.dev/");
  }

  async performSearch(searchText: string) {
    await this.searchButton.click();
    await this.searchInput.fill(searchText);
  }

  async clickIntro() {
    await this.introLink.first().click();
  }

  async navigateToFooterLink(linkText: string) {
    await this.footerLink(linkText).click();
  }

  async navigateToLanguage(language: string) {
    await this.languageDropdown(language).click();
  }
}
