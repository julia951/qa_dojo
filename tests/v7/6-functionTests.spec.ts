
import { test, expect } from '@playwright/test';
import { trafficLightAction } from './6-function';

test('зелений — перехід дозволено', async () => {
  const result = trafficLightAction('green');
  expect(result).toBe("Переходьте.");
});

test('жовтий — підготовка до переходу', async () => {
  const result = trafficLightAction('yellow');
  expect(result).toBe("Підготуйтеся.");
});

test('червоний — зупинка, чекайте', async () => {
  const result = trafficLightAction('red');
  expect(result).toBe("Зачекайте.");
});

test('неправильний колір — викидає помилку', async () => {
  expect(() => trafficLightAction('blue')).toThrow("Невірний колір світлофора");
});