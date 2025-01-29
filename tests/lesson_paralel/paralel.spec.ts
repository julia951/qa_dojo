import test, { expect } from "@playwright/test";

test.describe("group serial", () => {
  test.describe.configure({ mode: "parallel" });

  test("serial - 1", async ({ page }) => {
    console.log("Test serial 1 - starts");
    await page.waitForTimeout(3_000);
    console.log("Test serial 1 - finished");
  });

  test("serial - 2", async ({ page }) => {
    console.log("Test serial 2 - starts");
    await page.waitForTimeout(3_000);
    console.log("Test serial 2 - finished");
  });

  test("serial - 3", async ({ page }) => {
    console.log("Test serial 3 - starts");
    await page.waitForTimeout(3_000);
    console.log("Test serial 3 - finished");
  });
});
