// @ts-check
import { test, request as playwrightRequest } from '@playwright/test';

export const createRequest = async () => {
  return await playwrightRequest.newContext({
    baseURL: 'https://automationexercise.com/api',
  });
};

// test.describe('API Practice', () => {
//     const api = createRequest();
//     const response = await api.get('/productsList'));
//     test('Get All Products List', async () => {
//         const response = await request.get('https://automationexercise.com/api/productsList')

//         const {products} = await response.json() as {products: unknown[]}
//         expect(response.status()).toBe(200);
//         expect(Array.isArray(products)).toBe(true)
//         expect(products.length).toBeGreaterThan(0);
//     })
// })
