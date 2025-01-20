/* Вік для голосування

Напишіть програму, яка перевіряє, чи можна користувачу голосувати.

Вхід: Вік (наприклад, 17)
Вихід:
Якщо >= 18: "Ви можете голосувати."
Інакше: "Ви ще не можете голосувати."
 */

 export function isEligibleToVote (age: number): string {

  if (age >= 18) {
    return "Ви можете голосувати.";
  } else {
    return "Ви ще не можете голосувати.";
  }
}


/* 5️⃣ Порівняння чисел
⚖️ Порівняйте два числа: виведіть більше, або повідомте, що числа рівні.
Вхід: Два числа (наприклад, 8 і 10)
Вихід:
"Перше число більше."
"Друге число більше."
"Числа рівні."
 */

/* 6️⃣ Дорога і світлофор
🚦 Якщо зелений — переходьте. Жовтий — підготуйтеся. Червоний — зачекайте. */

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