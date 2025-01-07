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

test('LWB-000 Test adding article', async () => {

  const articleNameText = "My First Article";
  const articleDescText = "My First Article Description";
  const articleLongDescText = "My First Article Description Playwright Demo";
  const articleTagText = "Playwright";
  const emailText = "yulka001@test.com";
  const pwdText = "yulka001";

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const signInLink = page.locator('//a[contains(text(), "Sign in")]');
  const pwdInput = page.locator('//input[@type="password"]');
  const emailInput = page.locator('//input[@type="email"]');
  const signInBtn = page.locator('//button[contains(text(), "Sign in")]');

  await page.goto('https://demo.learnwebdriverio.com/', { waitUntil: 'networkidle' });

  await signInLink.click();
  await emailInput.fill(emailText);
  await pwdInput.fill(pwdText);
  await signInBtn.click();

  await page.locator('//a[contains(text(), "New Article")]').click();
  await page.locator('//input[@data-qa-id="editor-title"]').fill(articleNameText);
  await page.locator('//input[@data-qa-id="editor-description"]').fill(articleDescText);
  await page.locator('//textarea[contains(@class, "auto-textarea-input")]').fill(articleLongDescText);
  await page.locator('//*[@data-qa-id="editor-tags"]').fill(articleTagText);
  await page.locator('//*[@data-qa-id="editor-publish"]').click();

  await expect(page.locator('//*[@data-qa-id="article-title"]')).toContainText(articleNameText);

  //await page.waitForTimeout(2000);
});


/* 1. Пошук елементів за текстом  
1. Знайти заголовок сторінки conduit.  
2. Знайти навігаційне посилання Home.  
3. Знайти кнопку Sign in.  
4. Знайти текст A place to share your knowledge..  

 */

test('LWB-001 Test searching elements by text article', async () => {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const signInText = "Sign in";
  const signInBtn = page.locator('//a[contains(text(), "Sign in")]');
  const headerText = "conduit";
  const headerLocator = page.locator('//h1[contains(text(), "conduit")]');
  const homeNavMenuText = "Home";
  const homeNavMenuLocator = page.locator('//a[contains(text(), "Home")]');
  const paragraphText = "A place to share your knowledge.";
  const paragraphLocator = page.locator('//p[contains(text(), "A place to share your knowledge.")]');

  await page.goto('https://demo.learnwebdriverio.com/', { waitUntil: 'networkidle' });

  await expect(headerLocator).toContainText(headerText);
  await expect(homeNavMenuLocator).toContainText(homeNavMenuText);
  await expect(signInBtn).toContainText(signInText);
  await expect(paragraphLocator).toContainText(paragraphText);
});

/*  2. Пошук елементів за атрибутами  
5. Знайти всі зображення користувачів (аватари).  
6. Знайти кнопку Global Feed за класом.  
7. Знайти всі кнопки для додавання в улюблені ❤️ (heart icon).  
8. Знайти посилання з атрибутом href="/register".  
9. Знайти всі посилання з класом tag-pill.  
*/

test('LWB-002 Test searching elements by attributes', async () => {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const avatarsIcons = page.locator('img[@data-qa-type="author-avatar"]');
  const globalFeedTab = page.locator('//a[contains(@class, "nav-link") and contains(text(),"Global Feed")]');
  const likeBtns = page.locator('//button[@data-qa-type="article-favorite"]');
  const signUpBtn = page.locator('//a[@href="/register"]');
  const tagsBtns = page.locator('//li[contains(@class,"tag-pill")]');

  await page.goto('https://demo.learnwebdriverio.com/', { waitUntil: 'networkidle' });

  await expect(avatarsIcons).toBeVisible;
  await expect(globalFeedTab).toBeVisible;
  await expect(likeBtns).toBeVisible;
  await expect(signUpBtn).toBeVisible;
  await expect(tagsBtns).toBeVisible;
});

/* 3. Використання `contains()`  

10. Знайти всі елементи, текст яких містить *Read more*.  
11. Знайти всі теги <a> з класом, що містить *router-link*.  
12. Знайти всі кнопки з класом, що містить *btn-outline-primary*.  

*/

test('LWB-003 Test searching using contains', async () => {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const readMoreBtns = page.locator('//span[contains(text(), "Read more...")]');
  const routerLink = page.locator('//a[contains(@class, "router-link")]');
  const btnsOutlinePrm = page.locator('//button[contains(@class, "btn-outline-primary")]');


  await page.goto('https://demo.learnwebdriverio.com/', { waitUntil: 'networkidle' });

  await expect(readMoreBtns).toBeVisible;
  await expect(routerLink).toBeVisible;
  await expect(btnsOutlinePrm).toBeVisible;
});

/*
📌 4. Використання `starts-with()`  

13. Знайти всі елементи, у яких href починається з /articles.  

*/

test('LWB-004 Test searching using starts-with()', async () => {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const articles = page.locator('//*[starts-with(@href, "/articles")]');

  await page.goto('https://demo.learnwebdriverio.com/', { waitUntil: 'networkidle' });

  await expect(articles).toBeVisible;
});

/*
📌 5. Навігація по DOM (child, parent, sibling)  

14. Знайти батьківський <div> для аватара автора.  
15. Знайти текстовий заголовок статті ("Test") після аватара автора.  
16. Знайти всі дочірні <a> в <ul> навігації.  
17. Знайти наступний братній елемент для банера (.banner).  
18. Знайти всі елементи div всередині <div class="home-global">.  

//div[@class="home-global"]/div
*/

test('LWB-005 Test searching using DOM', async () => {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const avararsParentDiv = page.locator('//img[@data-qa-type="author-avatar"]/parent::a/parent::div');
  const articleTitle = page.locator('//a[@class="preview-link"]/descendant::h1');
  const aInUl = page.locator('//ul/descendant::a');
  const bannerFirstSibling = page.locator("//div[@class='banner']/following-sibling::*[1]");
  const divs = page.locator('//div[@class="home-global"]/div');

  await page.goto('https://demo.learnwebdriverio.com/', { waitUntil: 'networkidle' });

  await expect(avararsParentDiv).toBeVisible;
  await expect(articleTitle).toBeVisible;
  await expect(aInUl).toBeVisible;
  await expect(bannerFirstSibling).toBeVisible;
  await expect(divs).toBeVisible;
});

/*  6. Використання `normalize-space()` та `text()`  

19. Знайти посилання *Sign up* з пробілами перед текстом.  
20. Знайти <span> з текстом demo у популярних тегах.  

*/

test('LWB-006 Test searching using `normalize-space()` та `text()', async () => {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const signUpLink = await page.locator('//a[normalize-space(text())="Sign up"]');
  const demoSpan = await page.locator('//span[normalize-space(text())="demo"]');

  await page.goto('https://demo.learnwebdriverio.com/', { waitUntil: 'networkidle' });

  await expect(signUpLink).toBeVisible;
  await expect(demoSpan).toBeVisible;
});

/* 7. Використання логічних операторів (`AND`, `OR`)  

21. Знайти <button> з класом btn-outline-primary і атрибутом data-qa-type.  
22. Знайти всі <a> з класом tag-pill або текстом testing.  
*/

test('LWB-007 Test searching using `AND` та `OR', async () => {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const buttons = await page.locator('//button[contains(@class, "btn-outline-primary") and @data-qa-type]');
  const tagsBtns = page.locator('//li[contains(@class,"tag-pill") or contains(text(), "testing")]');

  await page.goto('https://demo.learnwebdriverio.com/', { waitUntil: 'networkidle' });

  await expect(buttons).toBeVisible;
  await expect(tagsBtns).toBeVisible;
});

/* 8. Перевірка відсутності елементів (`not()`)  

23. Знайти всі кнопки, які не мають класу btn-outline-primary.  

 */

test('LWB-008 Test searching using `not', async () => {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const btns = await page.locator('//button[not(contains(@class, "btn-outline-primary"))]');

  await page.goto('https://demo.learnwebdriverio.com/', { waitUntil: 'networkidle' });

  await expect(btns).toBeVisible;
});
