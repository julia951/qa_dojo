import { test as spec } from './fixture'

const usernameText = "Julka";
const emailText = "julka@test.com";

spec("CC-001 Test successful 1 Espresso", async ({ coffeeApp }) => {

  const successText = "Thanks for your purchase. Please check your email for payment.";

  await coffeeApp.navigate();
  await coffeeApp.clickOnEspresso();

  await coffeeApp.checkTotalPrice(coffeeApp.prices.espressoOne);

  await coffeeApp.openCart();
  await coffeeApp.purchase(usernameText, emailText);

  await coffeeApp.checkSuccessMessage(successText);
});

spec("CC-002 Test successful order Multiple Coffees", async ({ coffeeApp }) => {

  const successText = "Thanks for your purchase. Please check your email for payment.";

  await coffeeApp.navigate();
  await coffeeApp.clickOnEspresso();
  await coffeeApp.clickOnEspresso();
  await coffeeApp.clickOnEspresso();
  await coffeeApp.openCart();
  await coffeeApp.purchase(usernameText, emailText);

  await coffeeApp.checkSuccessMessage(successText);
});


spec("CC-003 Test Changing items By Plus Button", async ({ coffeeApp }) => {

  await coffeeApp.navigate();
  await coffeeApp.clickOnEspresso();
  await coffeeApp.clickOnEspresso();
  await coffeeApp.hoverCheckout();

  await coffeeApp.checkTotalPrice(coffeeApp.prices.espressoDouble);
  await coffeeApp.checkQuantity("x 2");
});

spec("CC-004 Test Deleting Item from Cart Using -", async ({ coffeeApp }) => {

  await coffeeApp.navigate();
  await coffeeApp.clickOnEspresso();
  await coffeeApp.hoverCheckout();
  await coffeeApp.removeEspresso();

  await coffeeApp.checkTotalPrice(coffeeApp.prices.empty);
});

spec("CC-005 Test Deleting Item from Cart Tab", async ({ coffeeApp }) => {

  const deleteMessage = "No coffee, go add some.";

  await coffeeApp.navigate();
  await coffeeApp.clickOnEspresso();
  await coffeeApp.openCartTab();
  await coffeeApp.clickRemoveIcon();

  await coffeeApp.checkNoItemsMessage(deleteMessage);
});

spec("CC-006 Test Lucky Banner", async ({ coffeeApp }) => {

  const luckyBanner = "It's your lucky day! Get an extra cup of Mocha for $4.";

  await coffeeApp.navigate();
  await coffeeApp.clickOnEspresso();
  await coffeeApp.clickOnEspresso();
  await coffeeApp.clickOnEspresso();

  await coffeeApp.checkLuckyBanner(luckyBanner);
});

spec("CC-007 Test Closing Cart with Full Items", async ({ coffeeApp }) => {

  const totalPrice = "Total: $10.00";

  await coffeeApp.navigate();
  await coffeeApp.clickOnEspresso();
  await coffeeApp.openCart();
  await coffeeApp.closeCart();

  await coffeeApp.checkTotalPrice(coffeeApp.prices.espressoOne);
});

spec("CC-008 Total Price All Items", async ({ coffeeApp }) => {

  await coffeeApp.navigate();
  await coffeeApp.clickAllCups();  

  await coffeeApp.checkTotalPrice(coffeeApp.prices.default);
});
