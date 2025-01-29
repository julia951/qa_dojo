import { test, expect } from "@playwright/test";

/* 1. Написати параметризований тест для форми https://demoqa.com/automation-practice-form
2. Дата провайдер повинен мати мінімум 5 разних наборів данних. 
3. Напишіть функцію конструктор яка буде повертати обʼєкт який містить властивості і методи необхідні для роботи зі сторінкою.

(приклад дивіться на відео https://t.me/c/2456196894/83/749) */


function hiMario() {
    console.log("It`s me Mario");
}
function hiLuigi() {
    console.log("It`s me Luigi");
}

const authData = [
    {
        testId: "cond-1",
        firstName: "someUsername",
        lastName: "aqsfasf",
        telephoneNumber: "0000000000",
        isSuccessful: true,
        func: hiMario,
    },
    {
        testId: "cond-2",
        firstName: "someUsername",
        lastName: "aqsfasf",
        telephoneNumber: "000000000",
        isSuccessful: false,
        func: hiMario,
    },
    {
        testId: "cond-3",
        firstName: "someUsername",
        lastName: "aqsfasf",
        telephoneNumber: "",
        isSuccessful: false,
        func: hiMario,
    },
    {
        testId: "cond-4",
        firstName: "someUsername",
        lastName: "aqsfasf",
        telephoneNumber: "someUsername",
        isSuccessful: false,
        func: hiMario,
    }
];

for (const {
    testId,
    firstName,
    lastName,
    telephoneNumber,
    isSuccessful,
    func,
} of authData) {
    test(`${testId} Try to register without mandatory field`, async ({
        page,
    }) => {
        await page.goto("https://demoqa.com/automation-practice-form");

        func();
        await page.getByPlaceholder("First Name").fill(firstName);
        await page.getByPlaceholder("Last Name").fill(lastName);
        await page.getByText('Male', { exact: true }).click();
        await page.getByPlaceholder('Mobile Number').fill(telephoneNumber);
        //await page.getByPlaceholder("Password").fill(Password);
        await page.getByRole('button', { name: 'Submit' }).click();

        func();

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
