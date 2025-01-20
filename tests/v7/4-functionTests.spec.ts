
import { test, expect } from '@playwright/test';
import { isEligibleToVote } from './4-function';

const passedMsg = "Ви можете голосувати.";
const notPassedMsg = "Ви ще не можете голосувати.";
const errorMsg = "Ви ще не можете голосувати.";

test('17 check', async () => {
  const result = isEligibleToVote(17); 
  expect(result).toBe(notPassedMsg); 
});

test('18 check', async () => {
  const result = isEligibleToVote(18); 
  expect(result).toBe(passedMsg); 
});

test('19 check', async () => {
  const result = isEligibleToVote(19); 
  expect(result).toBe(passedMsg); 
});