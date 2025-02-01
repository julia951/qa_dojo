import test, { Page } from "@playwright/test";
import { CoffeeCartPage } from "./CoffeeCartPage1";

const coffeeDrinks = [
  "Espresso",
  "Espresso Macchiato",
  "Capuccino",
  "Flat_white",
  "Anericano",
  "Cafe_Latte",
  "Espresso_Con Panna",
];

test("test111", async ({ page }) => {

  const coffeeCartPage = new CoffeeCartPage(page);

  await coffeeCartPage.navigateTo();
  await coffeeCartPage.clickCofeeCups(coffeeDrinks);
  await coffeeCartPage.clickCheckout();
  await coffeeCartPage.fillOrderForm({
    Email: "psp@test.com",
    Name: "1214@gam.com",
  });

  await coffeeCartPage.clickSubmitButton();

});