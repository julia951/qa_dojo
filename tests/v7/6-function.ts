/* 6️⃣ Дорога і світлофор

🚦 Якщо зелений — переходьте. Жовтий — підготуйтеся. Червоний — зачекайте. */

export function trafficLightAction(color: string): string {
  switch(color.toLowerCase()) {
    case 'green':
      return "Переходьте.";
    case 'yellow':
      return "Підготуйтеся.";
    case 'red':
      return "Зачекайте.";
    default:
      return "Невідомий колір світлофора.";
  }
}


/* 7️⃣ Визначення типу числа
➕➖ Напишіть програму, яка визначає, чи число додатнє, від’ємне або дорівнює нулю.
Вхід: Число (наприклад, -5)
Вихід:
"Число додатнє."
"Число від’ємне."
"Число дорівнює нулю." */


/* ⚡️⚡️⚡️ Просунутий LVL 

Написати на ці програми Unit тести  
=> приклад виконання 
import { test, expect } from "@playwright/test";

function isPositive(number) {
  if (typeof number === "number") {
    if (number > 0) {
      console.log("number is positive");
      return true;
    } else if (number === 0) {
      console.log("number is negative");
      return false;
    } else {
      console.log("number is negative");
      return false;
    }
  } else {
    throw Error("pls use number to check if it positive");
  }
}

// Класи еквівалентності
// positive
// negative
// zero

// Граничні значення
// 1
// 0
// -1
// + бескінечність
// - бескінечність

test("is positive", async () => {
  const result = isPositive(1);
  expect(result).toBeTruthy();
});

test("is positive - max value", async () => {
  const result = isPositive(1.7976931348623157e308);
  expect(result).toBeTruthy();
});

test("is negative", async () => {
  const result = isPositive(-1);
  expect(result).toBeFalsy();
});

test("is negative - min value", async () => {
  const result = isPositive(-1.7976931348623157e308);
  expect(result).toBeFalsy();
}); */