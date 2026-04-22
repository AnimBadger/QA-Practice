// @ts-check
import { test, expect, type Locator} from '@playwright/test';

test.describe('test login functionality', () => {
    let usernameInput: Locator;
    let passwordInput: Locator;
    let loginButton: Locator;
    
    test('login test', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        usernameInput = page.getByRole('textbox', { name: 'Username' });
        passwordInput = page.getByRole('textbox', { name: 'Password' });
        loginButton = page.getByRole('button', { name: 'Login' });

        await usernameInput.fill('standard_user');
        await passwordInput.fill('secret_sauce');
        await loginButton.click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});