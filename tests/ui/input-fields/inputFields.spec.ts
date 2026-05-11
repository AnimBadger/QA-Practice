import { test, expect } from "../../fixtures/pages";

const movieName = "Inception";

test.describe("Input Fields", () => {
  test("should type a movie name and verify the value", async ({
    inputFieldsPage,
  }) => {
    await inputFieldsPage.goto();
    await inputFieldsPage.enterMovieName(movieName);
    const value = await inputFieldsPage.getMovieNameValue();
    expect(value).toBe(movieName);
  });

  test("should hide placeholder after typing", async ({ inputFieldsPage }) => {
    await inputFieldsPage.goto();
    await expect(inputFieldsPage.movieNameInput).toHaveAttribute(
      "placeholder",
      "Enter hollywood movie name",
    );
    await inputFieldsPage.enterMovieName("Interstellar");
    const value = await inputFieldsPage.getMovieNameValue();
    expect(value).toBe("Interstellar");
  });

  test("should append text and shift focus on Tab", async ({
    inputFieldsPage,
  }) => {
    await inputFieldsPage.goto();
    await inputFieldsPage.focusAppendText();
    await inputFieldsPage.appendTextToAppendInput("I am good");
    await inputFieldsPage.pressTab();
    const focused = await inputFieldsPage.isAppendTextFocused();
    expect(focused).toBe(false);
  });

  test("should preserve original text when appending", async ({
    inputFieldsPage,
  }) => {
    await inputFieldsPage.goto();
    const originalValue = await inputFieldsPage.getAppendTextValue();
    expect(originalValue).toBe("I am good");
    await inputFieldsPage.focusAppendText();
    const appended = " and I love movies";
    await inputFieldsPage.appendTextToAppendInput(appended);
    const finalValue = await inputFieldsPage.getAppendTextValue();
    expect(finalValue).toBe(originalValue + appended);
  });

  test("should read pre-filled verify text value", async ({
    inputFieldsPage,
  }) => {
    await inputFieldsPage.goto();
    const value = await inputFieldsPage.getVerifyTextValue();
    expect(value).toBe("QA PlayGround");
  });

  test("should read verify text via getAttribute", async ({
    inputFieldsPage,
  }) => {
    await inputFieldsPage.goto();
    const value = await inputFieldsPage.getVerifyTextAttribute();
    expect(value).toBe("QA PlayGround");
  });

  test("should clear the text input", async ({ inputFieldsPage }) => {
    await inputFieldsPage.goto();
    const initialValue = await inputFieldsPage.getClearTextValue();
    expect(initialValue).toBe("QA PlayGround Clear Me");
    await inputFieldsPage.clearClearText();
    const finalValue = await inputFieldsPage.getClearTextValue();
    expect(finalValue).toBe("");
  });

  test("should clear text input and verify via getAttribute", async ({
    inputFieldsPage,
  }) => {
    await inputFieldsPage.goto();
    await inputFieldsPage.clearClearText();
    const value = await inputFieldsPage.getClearTextAttribute();
    expect(value).toBe("");
  });

  test("should not allow typing in disabled input", async ({
    inputFieldsPage,
  }) => {
    await inputFieldsPage.goto();
    await expect(inputFieldsPage.disabledInput).toBeDisabled();
    await inputFieldsPage.attemptTypeDisabled("new text");
    const value = await inputFieldsPage.getDisabledValue();
    expect(value).toBe("Enter");
  });

  test("should verify disabled input via isEnabled and toBeDisabled", async ({
    inputFieldsPage,
  }) => {
    await inputFieldsPage.goto();
    const enabled = await inputFieldsPage.isDisabledInputEnabled();
    expect(enabled).toBe(false);
    await expect(inputFieldsPage.disabledInput).toBeDisabled();
  });

  test("should not allow typing in readonly input", async ({
    inputFieldsPage,
  }) => {
    await inputFieldsPage.goto();
    await inputFieldsPage.attemptTypeReadonly("changed");
    const value = await inputFieldsPage.getReadonlyValue();
    expect(value).toBe("This text is readonly");
  });

  test("should verify readonly attribute via getAttribute and toHaveAttribute", async ({
    inputFieldsPage,
  }) => {
    await inputFieldsPage.goto();
    const attr = await inputFieldsPage.getReadonlyAttribute();
    expect(attr).not.toBeNull();
    await expect(inputFieldsPage.readonlyInput).toHaveAttribute("readonly");
  });
});
