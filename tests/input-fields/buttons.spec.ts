// @ts-check
import {test, expect, type Locator} from '@playwright/test';

test.describe('Input box practice', () => {
  let movieName: Locator;

  test.beforeEach(async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice/buttons');
  movieName = page.getByTestId('btn-goto-home');
});

});

