import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice/input-fields');
  await page.getByTestId('input-clear-text').click();
  await page.getByTestId('input-clear-text').fill('');
  await expect(page.getByTestId('input-clear-text')).toBeEmpty();
});