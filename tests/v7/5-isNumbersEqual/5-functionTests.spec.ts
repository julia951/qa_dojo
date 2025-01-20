
import { test, expect } from '@playwright/test';
import { isNumbersEqual } from './5-function';

test('check age1 is bigger', async () => {
  const result = isNumbersEqual(17, 10); 
  expect(result).toBe("Перше число більше."); 
});

test('check age2 is bigger', async () => {
  const result = isNumbersEqual(18, 20); 
  expect(result).toBe("Друге число більше."); 
});

test('check eqqulity', async () => {
  const result = isNumbersEqual(19, 19); 
  expect(result).toBe("Числа рівні."); 
});