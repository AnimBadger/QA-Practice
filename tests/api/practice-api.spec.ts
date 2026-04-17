// @ts-check
import {test, expect, request} from '@playwright/test';


test.describe('API Practice', () => {
    test('Get All Products List', async ({request}) => {
        const response = await request.get('https://automationexercise.com/api/productsList')

        const {products} = await response.json() as {products: unknown[]}
        expect(response.status()).toBe(200);
        expect(Array.isArray(products)).toBe(true)
        expect(products.length).toBeGreaterThan(0);
    })
})
