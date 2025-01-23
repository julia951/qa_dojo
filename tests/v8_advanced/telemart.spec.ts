import { test, expect, chromium, Browser, BrowserContext, Page } from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeEach(async () => {

  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 }); 
  await page.goto('https://telemart.ua/ua/', { waitUntil: 'networkidle' });
});

test.afterEach(async () => {

  await browser.close();
});

test('TEL-001 Check that carousels elements more than 2', async () => {

  const carousel = page.locator('[class="swiper-slide"]');
  const carouselItemsCount = await carousel.count();

  await expect(carouselItemsCount).toBeGreaterThan(2);
});

test('TEL-002 Check the third banner Navigation', async () => {

  const carouselBtn = page.locator('[class="swiper-button-next"]');
  const thirdBanner = page.locator('//div[@class="categories-slider"]//a[contains(@class, "swiper-slide-active")]');

  await carouselBtn.click();
  await page.waitForTimeout(300); 
  await carouselBtn.click();

  const href = await thirdBanner.getAttribute('href');
  console.log('Href третього банера:', href);

  await thirdBanner.click();
  
  const currentUrl = page.url();
  const updatedUrl = currentUrl.replace('/ua/', '/');
  await expect(updatedUrl).toBe(href); 
});