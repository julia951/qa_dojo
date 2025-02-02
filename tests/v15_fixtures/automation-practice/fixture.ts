import { test as baseTest }  from '@playwright/test'
import { RegisterPage } from './Register.Page';

type Pages = {
  registerApp: RegisterPage;
}

export const test = baseTest.extend<Pages>({
  
  registerApp: async ({ page }, use) => {
    const locatorsRegisterApp = new RegisterPage(page);

    await use(locatorsRegisterApp);
  }
})