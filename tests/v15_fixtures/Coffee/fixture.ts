import { test as baseTest }  from '@playwright/test'
import { CoffeeCartPage } from './CoffeeCart.Page';

type Pages = {
  coffeeApp: CoffeeCartPage;
}

export const test = baseTest.extend<Pages>({
  
  coffeeApp: async ({ page }, use) => {
    const locatorsCoffeeApp = new CoffeeCartPage(page);

    await use(locatorsCoffeeApp);
  }
})