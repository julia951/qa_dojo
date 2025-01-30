import { test, expect, Page } from "@playwright/test";

/* 1. Написати параметризований тест для форми https://demoqa.com/automation-practice-form
2. Дата провайдер повинен мати мінімум 5 разних наборів данних. 
3. Напишіть функцію конструктор яка буде повертати обʼєкт який містить властивості і методи необхідні для роботи зі сторінкою.

(приклад дивіться на відео https://t.me/c/2456196894/83/749) */

function RegisterPage(page: Page) {
    return {
        page,

        async navigateTo() {
            await this.page.goto('https://demoqa.com/automation-practice-form');
        },

        async fillRegisterForm(registerData: { firstName: string, lastName: string, telephoneNumber: string }) {
            await this.page.getByPlaceholder("First Name").fill(registerData.firstName);
            await this.page.getByPlaceholder("Last Name").fill(registerData.lastName);
            await this.page.getByText('Male', { exact: true }).click();
            await this.page.getByPlaceholder('Mobile Number').fill(registerData.telephoneNumber);
            await this.page.getByRole('button', { name: 'Submit' }).click();
        }
    };
}

const authData = [
    {
        testId: "cond-1",
        firstName: "someUsername",
        lastName: "aqsfasf",
        telephoneNumber: "0000000000",
        isSuccessful: true,
    },
    {
        testId: "cond-2",
        firstName: "someUsername",
        lastName: "aqsfasf",
        telephoneNumber: "000000000",
        isSuccessful: false,
    },
    {
        testId: "cond-3",
        firstName: "someUsername",
        lastName: "aqsfasf",
        telephoneNumber: "",
        isSuccessful: false,
    },
    {
        testId: "cond-4",
        firstName: "someUsername",
        lastName: "aqsfasf",
        telephoneNumber: "someUsername",
        isSuccessful: false,
    }
];

for (const {
    testId,
    firstName,
    lastName,
    telephoneNumber,
    isSuccessful,
} of authData) {
    test(`${testId} Try to register without mandatory field`, async ({ page }) => {
        
        const registerPage =  RegisterPage(page);
        await registerPage.navigateTo();
        await registerPage.fillRegisterForm({ firstName, lastName, telephoneNumber });


        if (isSuccessful) {
            await expect(page.locator('#example-modal-sizes-title-lg')).toContainText('Thanks for submitting the form');
            await expect(page.locator('tbody')).toContainText(`${firstName} ${lastName}`);
            await expect(page.locator('tbody')).toContainText('Male');
            await expect(page.locator('tbody')).toContainText(`${telephoneNumber}`);
        } else {
            await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible();
        }
    });
}
