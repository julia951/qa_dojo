
import { test, expect } from '@playwright/test';
import { greeting } from './2-function';

const morningGreeting = "Доброго ранку!";
const dayGreeting = "Доброго дня!";
const eveningGreeting = "Доброго вечора!";
const errorMsg = "Невірне значення години. Має бути в діапазоні від 0 до 23.";

test('11 check', async () => {
  const result = greeting(11); 
  expect(result).toBe(morningGreeting); 
});

test('12 check', async () => {
  const result = greeting(12); 
  expect(result).toBe(dayGreeting); 
});

test('13 check', async () => {
  const result = greeting(13); 
  expect(result).toBe(dayGreeting); 
});

test('17 check', async () => {
  const result = greeting(17); 
  expect(result).toBe(dayGreeting); 
});

test('18 check', async () => {
  const result = greeting(18); 
  expect(result).toBe(eveningGreeting); 
});

test('19 check', async () => {
  const result = greeting(19); 
  expect(result).toBe(eveningGreeting); 
});

test('0 check', async () => {
  const result = greeting(0); 
  expect(result).toBe(errorMsg); 
});

test('1 check', async () => {
  const result = greeting(1); 
  expect(result).toBe(morningGreeting); 
});

test('24 check', async () => {
  const result = greeting(24); 
  expect(result).toBe(errorMsg); 
});


/* 3️⃣ Перевірка оцінки
📚 Якщо бал >= 50 — "Тест складено". Якщо < 50 — "Тест не складено".

4️⃣ Вік для голосування
🗳 Напишіть програму, яка перевіряє, чи можна користувачу голосувати.
Вхід: Вік (наприклад, 17)
Вихід:
Якщо >= 18: "Ви можете голосувати."
Інакше: "Ви ще не можете голосувати."
 */

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