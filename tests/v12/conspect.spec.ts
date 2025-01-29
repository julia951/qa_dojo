import { test, expect } from "@playwright/test";

function hiMario() {
  console.log("It`s me Mario");
}
function hiLuigi() {
  console.log("It`s me Luigi");
}

const authData = [
  {
    testId: "cond-1",
    Username: "someUsername",
    Email: "aqsfasf@gom.com",
    Password: "1251515",
    isSuccessful: true,
    func: hiMario,
  },
  {
    testId: "cond-2",
    Username: "",
    Email: "aqsfasf@gom.com",
    Password: "1251515",
    isSuccessful: false,
    func: hiLuigi,
  },
  {
    testId: "cond-3",
    Username: "someUsername",
    Email: "",
    Password: "1251515",
    isSuccessful: false,
    func: hiMario,
  },
  {
    testId: "cond-4",
    Username: "someUsername",
    Email: "aqsfasf@gom.com",
    Password: "",
    isSuccessful: false,
    func: hiMario,
  },
];

for (const {
  testId,
  Username,
  Password,
  Email,
  isSuccessful,
  func,
} of authData) {
  test(`${testId} Try to register without mandatory field`, async ({
    page,
  }) => {
    await page.goto("https://demo.learnwebdriverio.com/register");

    func();
    await page.getByPlaceholder("Username").fill(Username);
    await page.getByPlaceholder("Email").fill(Email);
    await page.getByPlaceholder("Password").fill(Password);
    await page.getByRole("button", { name: "Sign up" }).click();

    func();

    if (isSuccessful) {
      await expect(page.locator("#app")).toContainText(Username);
    } else {
      await expect(page.locator("#app")).not.toContainText(Username);
    }
  });
}
