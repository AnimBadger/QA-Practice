import { test as base } from '@playwright/test';
import { InputFieldsPage } from '../../pages/input-fields/inputFieldsPage';

type Pages = {
  inputFieldsPage: InputFieldsPage;
};

export const test = base.extend<Pages>({
  inputFieldsPage: async ({ page }, use) => {
    const inputFieldsPage = new InputFieldsPage(page);
    await use(inputFieldsPage);
  },
});

export { expect } from '@playwright/test';
