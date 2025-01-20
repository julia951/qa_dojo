
import { test, expect } from '@playwright/test';
import { isOddOrEven } from './1-function';


test('Odd check', async () => {
  const result = isOddOrEven(10); 
  expect(result).toBe("Число парне."); 
});

test('Even check', async () => {
  const result = isOddOrEven(11); 
  expect(result).toBe("Число непарне."); 
});

test('Zer0 check', async () => {
  const result = isOddOrEven(0); 
  expect(result).toBe("Число парне."); 
});

test('Negative even number check', async () => {
  const result = isOddOrEven(-4);  
  expect(result).toBe("Число парне.");
});

test('Negative odd number check', async () => {
  const result = isOddOrEven(-5);  
  expect(result).toBe("Число непарне.");
});

test('Large even number check', async () => {
  const result = isOddOrEven(1000000);  // Велике парне число
  console.log(result);
  expect(result).toBe("Число парне.");
});

test('Large odd number check', async () => {
  const result = isOddOrEven(999999);  // Велике непарне число
  console.log(result);
  expect(result).toBe("Число непарне.");
});

test('Decimal check', async () => {
  const result = isOddOrEven(10.5);  // Дробове число
  console.log(result);
  expect(result).toBe("Число непарне.");  // В результаті має бути непарне
});

test('String number check', async () => {
  const result = isOddOrEven("10");  // Число в вигляді рядка
  console.log(result);
  expect(result).toBe("Число парне.");
});