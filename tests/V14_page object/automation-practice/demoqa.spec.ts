import { test, expect, Page } from "@playwright/test";
import { RegisterPage } from "./Register.Page";

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

    test(`${testId}`, async ({ page }) => {
    
        const registerPage =  new RegisterPage(page);

        await registerPage.navigate();

        console.log("fdgsdg111^ " + firstName);

        await registerPage.fillRegisterForm({ firstName, lastName, telephoneNumber });

        console.log("fdgsdg^ " + firstName);


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
