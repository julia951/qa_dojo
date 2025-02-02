import { test as baseTest }  from '@playwright/test'
import { HomePage } from './СondulitHome.Page';

type Pages = {
  condulitApp: HomePage;
}

export const test = baseTest.extend<Pages>({

  condulitApp: async ({ page }, use) => {
    const locatorsConduit = new HomePage(page);

    await use(locatorsConduit);
  }
})