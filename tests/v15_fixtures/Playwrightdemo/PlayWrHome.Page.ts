import { Page, Locator, expect } from "@playwright/test";

export class PlayWrHomePage {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly searchInput: Locator;
  readonly introLink: Locator;
  readonly headerLink: Locator;
  readonly footerLink: (text: string) => Locator;
  readonly apiLink: Locator;
  readonly languageDropdown: (language: string) => Locator;
  readonly getStartedLink: Locator;
  readonly bannerHeader: Locator;
  readonly body: Locator;
  readonly languageDropdownLocator: Locator;
  readonly learnVideosLink: Locator;
  readonly featureVideosLink: Locator;
  readonly tsLink: Locator;
  readonly jsLink: Locator;

  readonly testSearchQueries = {
    valid: "browser",
    invalid: "kovbasa",
  };

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
    this.getStartedLink = page.locator('a[class="getStarted_Sjon"]');
    this.bannerHeader = page.locator("header");
    this.body = page.locator("body");
    this.languageDropdownLocator = page.locator('a[class="navbar__link"]'); 
    this.apiLink = page.locator('a[href="/community/welcome"]');
    this.learnVideosLink = page.locator('a[href="/community/learn-videos"]');
    this.featureVideosLink = page.locator('a[href="/community/feature-videos"]');
    this.tsLink = page.locator('//a[@href="https://playwright.dev/docs/intro" and text()="TypeScript"]');
    this.jsLink = page.locator('//a[@href="https://playwright.dev/docs/intro" and text()="JavaScript"]');
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

  async hoverOnLanguageDropdown() {
    await this.languageDropdownLocator.hover();
  }

  async navigateToCommunityPage() {
    await this.apiLink.click();
  }

  async navigateToLearnVideos() {
    await this.learnVideosLink.click();
  }

  async navigateToFeatureVideos() {
    await this.featureVideosLink.click();
  }

  async navigateTS() {
    await this.tsLink.click();
  }

  async navigateJS() {
    await this.jsLink.click();
  }
  async navigateToLanguagePage(language: string) {
    const languageLink = this.page.locator(`//a[@href="https://playwright.dev/${language}/docs/intro"]`);
    await languageLink.click();
  }

  async navigateToLanguagePageName(languageName: string) {
    const languageLink = this.page.locator(`//a[@href="https://playwright.dev/docs/intro"  and text()="${languageName}"]`);
    await languageLink.click();
  }
  
  // Cheks

  async checkGetStartedLinkVisibility() {
    await expect(this.getStartedLink).toBeVisible();
  }

  async checkBannerContainsText(expectedText: string) {
    await expect(this.bannerHeader).toContainText(expectedText);
  }

  async validateSearchInputValue(expectedValue: string) {
    await expect(this.searchInput).toHaveValue(expectedValue);
  }

  async validateNoSearchResults(searchText: string) {
    await expect(this.body).toContainText(`No results for "${searchText}"`);
  }

  async checkHeaderContainsText(expectedText: string) {
    await expect(this.headerLink).toContainText(expectedText);
  }

  async checkLanguageText(language: string) {
    await expect(this.languageDropdownLocator).toContainText(language);
  }

  async checkLanguageInDropdown(language: string) {
    const dropdown = this.languageDropdownLocator.locator(`text=${language}`);

    await expect(dropdown).toContainText(language);
  }

  async checkElementText(locator: Locator, expectedText: string) {
    await expect(locator).toContainText(expectedText);
  }
}
