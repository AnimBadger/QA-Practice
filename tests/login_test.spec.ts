import {expect, test} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import loginData from '../test-data/loginData.json';

test.describe('Login Test', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.gotOnLoginPage();
    });

    loginData.forEach((data) => {
        if (!data.run) return;
    
        test(`login test for ${data.username}`, async () => {
            await loginPage.login(data.username, data.password);
            if (data.expected === 'success') {
                await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
            } else {
                await expect(loginPage.errorMessage).toBeVisible();
                await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
            }
        });
    });   
});
