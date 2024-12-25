import { test, expect, chromium } from '@playwright/test';
import { time } from 'console';


/* Напишіть тест 

1) goto https://demo.learnwebdriverio.com/
2) авторизуйтесь під юзером (якого ви створили в ручну і використовуєте для подальшого тестування)  yulkatest yulkatext159
3) Переходьте на сторінку New Article 
4) Створіть Артікл (заповнюйте всі поля) 
5) Перевірте що артікл створився 

ВИКОРИСТОВУЙТЕ ЛИШЕ XPATH для знаходження елементів
шпаргалка по XPATH: https://github.com/qa-senpai/test-automation-example/blob/main/cheat-sheets/xpath.md */

test('testGetStartedLinkVisibility', async () => {

  const articleName = "My First Article";
  const articleDesc = "My First Article Description";
  const articleLongDesc = "My First Article Description Playwright Demo";
  const articleTag = "Playwright";

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://demo.learnwebdriverio.com/', { waitUntil: 'networkidle' });

  await page.locator('//a[contains(text(), "Sign in")]').click();
  await page.locator('//input[@type="email"]').fill("yulka@test.com");
  await page.locator('//input[@type="password"]').fill("yulkatext159");
  await page.locator('//button[contains(text(), "Sign in")]').click();

  await page.locator('//a[contains(text(), "New Article")]').click();
  await page.locator('//input[@data-qa-id="editor-title"]').fill(articleName);
  await page.locator('//input[@data-qa-id="editor-description"]').fill(articleDesc);
  await page.locator('//textarea[contains(@class, "auto-textarea-input")]').fill(articleLongDesc);
  await page.locator('//*[@data-qa-id="editor-tags"]').fill(articleTag);
  await page.locator('//*[@data-qa-id="editor-publish"]').click();

  await expect(page.locator('//*[@data-qa-id="article-title"]')).toContainText(articleName);

  //await page.waitForTimeout(2000);
});