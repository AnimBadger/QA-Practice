// @ts-check
import { test, expect, type Locator } from "@playwright/test";

test.describe("Input box practice", () => {
  let movieName: Locator;
  let appendTextField: Locator;
  let presentTextField: Locator;
  let cleartextField: Locator;
  let disabledField: Locator;
  let readonlyField: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.qaplayground.com/practice/input-fields");

    movieName = page.getByTestId("input-movie-name");
    appendTextField = page.getByTestId("input-append-text");
    presentTextField = page.getByTestId("input-verify-text");
    cleartextField = page.getByTestId("input-clear-text");
    disabledField = page.getByTestId("input-disabled");
    readonlyField = page.getByTestId("input-readonly");
  });

  test.describe("Movie input field", () => {
    test("accepts valid input", async () => {
      const value = "User123";
      await movieName.fill(value);
      await expect(movieName).toHaveValue(value);
    });

    test("has correct placeholder and accepts input", async () => {
      await expect(movieName).toHaveAttribute(
        "placeholder",
        "Enter hollywood movie name",
      );

      const value = "Inception";
      await movieName.fill(value);
      await expect(movieName).toHaveValue(value);
    });
  });

  test("appends text and moves focus on Tab", async () => {
    await appendTextField.fill("I am goody yahh");
    await appendTextField.press("Tab");

    await expect(presentTextField).toBeFocused();
  });

  test("should be able to append text", async () => {
    const existingValue = await appendTextField.inputValue();

    const newText = "- dat";
    await appendTextField.fill(existingValue + newText);
    expect(appendTextField).toHaveValue(existingValue + newText);
  });

  test("verify text present inside input field matches expected value", async () => {
    const fieldValue = await presentTextField.inputValue();
    await expect(presentTextField).toHaveValue(fieldValue);
  });

  test("verify input field text can be cleared successfully", async () => {
    await cleartextField.fill("");
    await expect(cleartextField).toBeEmpty();
  });
  test("verify disabled fields cannot be edited by user", async () => {
    await expect(disabledField).toBeDisabled();
    await expect(disabledField).toHaveValue("Enter");
  });

  test("verify is Enabled() returns false for disabled fields", async () => {
    await expect(disabledField).toBeDisabled();
  });
});

//   // 2. Boundary & Validation
//   test('should respect max length attribute', async () => {
//     const maxLength: number = 10;
//     const longString: string = 'A'.repeat(maxLength + 5);

//     await input.fill(longString);

//     const value: string = await input.inputValue();
//     expect(value.length).toBeLessThanOrEqual(maxLength);
//   });

//   test('should handle empty submission with error state', async () => {
//     await input.fill('');
//     await submitBtn.click();

//     const errorMessage: Locator = page.locator('.error-text');
//     await expect(errorMessage).toBeVisible();
//     await expect(errorMessage).toHaveText('This field is required');
//   });

//   // 3. Security & Edge Cases
//   test('should sanitize potential XSS scripts', async () => {
//     const xssScript: string = '<script>alert("xss")</script>';
//     await input.fill(xssScript);
//     await expect(input).toHaveValue(xssScript);
//   });

//   test('should trim leading and trailing whitespace', async () => {
//     await input.fill('  trimmed  ');
//     await input.blur();
//     await expect(input).toHaveValue('trimmed');
//   });

//   // 4. Keyboard Interactions
//   test('should submit form on Enter key press', async ({ page }) => {
//     await input.fill('Testing Enter');
//     await input.press('Enter');
//     await expect(page).toHaveURL(/success/);
//   });

//   test('should allow tabbing into the field', async ({ page }) => {
//     // Start focus elsewhere (the body) then tab in
//     await page.focus('body');
//     await page.keyboard.press('Tab');
//     await expect(input).toBeFocused();
//   });
