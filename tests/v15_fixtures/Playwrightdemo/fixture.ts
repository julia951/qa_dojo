import { test as baseTest }  from '@playwright/test'
import { PlayWrHomePage } from './PlayWrHome.Page';

type Pages = {
  playWrApp: PlayWrHomePage;
}

export const test = baseTest.extend<Pages>({
  
  playWrApp: async ({ page }, use) => {
    const locatorsPlayWrApp = new PlayWrHomePage(page);

    await use(locatorsPlayWrApp);
  }
})