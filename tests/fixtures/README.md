Usage: Page fixtures

- Import the extended `test` and `expect` from `./fixtures/pages` in specs that need Page Objects.

Example:

    import { test, expect } from './fixtures/pages';

    test('example', async ({ loginPage }) => {
      await loginPage.gotOnLoginPage();
      await loginPage.login('standard_user', 'secret_sauce');
      await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

This pattern centralizes creation of Page Object instances and keeps tests concise.
