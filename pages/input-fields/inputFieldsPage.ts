import { Page, Locator } from '@playwright/test';
import { ROUTES } from '../../constants/routes';

export class InputFieldsPage {
  readonly page: Page;
  readonly movieNameInput: Locator;
  readonly appendTextInput: Locator;
  readonly verifyTextInput: Locator;
  readonly clearTextInput: Locator;
  readonly disabledInput: Locator;
  readonly readonlyInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.movieNameInput = page.getByTestId('input-movie-name');
    this.appendTextInput = page.getByTestId('input-append-text');
    this.verifyTextInput = page.getByTestId('input-verify-text');
    this.clearTextInput = page.getByTestId('input-clear-text');
    this.disabledInput = page.getByTestId('input-disabled');
    this.readonlyInput = page.getByTestId('input-readonly');
  }

  async goto() {
    await this.page.goto(`${ROUTES.QA_PLAYGROUND}/practice/input-fields`);
  }

  async enterMovieName(movieName: string) {
    await this.movieNameInput.fill(movieName);
  }

  async getMovieNameValue(): Promise<string> {
    return await this.movieNameInput.inputValue();
  }

  async focusAppendText() {
    await this.appendTextInput.click();
  }

  async appendTextToAppendInput(text: string) {
    await this.page.keyboard.press('End');
    await this.page.keyboard.type(text);
  }

  async pressTab() {
    await this.page.keyboard.press('Tab');
  }

  async getAppendTextValue(): Promise<string> {
    return await this.appendTextInput.inputValue();
  }

  async getVerifyTextValue(): Promise<string> {
    return await this.verifyTextInput.inputValue();
  }

  async getVerifyTextAttribute(): Promise<string | null> {
    return await this.verifyTextInput.getAttribute('value');
  }

  async getClearTextValue(): Promise<string> {
    return await this.clearTextInput.inputValue();
  }

  async getClearTextAttribute(): Promise<string | null> {
    return await this.clearTextInput.getAttribute("value");
  }

  async clearClearText() {
    await this.clearTextInput.clear();
  }

  async getDisabledValue(): Promise<string> {
    return await this.disabledInput.inputValue();
  }

  async attemptTypeDisabled(text: string) {
    await this.disabledInput.fill(text, { force: true });
  }

  async isDisabledInputEnabled(): Promise<boolean> {
    return await this.disabledInput.isEnabled();
  }

  async getReadonlyValue(): Promise<string> {
    return await this.readonlyInput.inputValue();
  }

  async attemptTypeReadonly(text: string) {
    await this.readonlyInput.fill(text, { force: true });
  }

  async getReadonlyAttribute(): Promise<string | null> {
    return await this.readonlyInput.getAttribute("readonly");
  }

  async isAppendTextFocused(): Promise<boolean> {
    return await this.appendTextInput.evaluate(el => el === document.activeElement);
  }
}
