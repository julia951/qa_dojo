
import { test, expect } from '@playwright/test';
import { checkGrade } from './3-function';

const passedMsg = "Тест складено";
const notPassedMsg = "Тест не складено";
const errorMsg = "Невірне значення оцінки.";

test('50 check', async () => {
  const result = checkGrade(50); 
  expect(result).toBe(passedMsg); 
});

test('49 check', async () => {
  const result = checkGrade(49); 
  expect(result).toBe(notPassedMsg); 
});

test('51 check', async () => {
  const result = checkGrade(51); 
  expect(result).toBe(passedMsg); 
});

test('0 check', async () => {
  const result = checkGrade(0); 
  expect(result).toBe(notPassedMsg); 
});

test('1 check', async () => {
  const result = checkGrade(1); 
  expect(result).toBe(notPassedMsg); 
});