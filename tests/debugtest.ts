import { test, expect } from '@playwright/test';

test('search products', async ({ request }) => {

    const response = await request.get(
        'https://dummyjson.com/products/search?q=phone'
    );

    console.log('STATUS:', response.status());
    console.log('URL:', response.url());

    const body = await response.json();

    console.log('BODY:', JSON.stringify(body, null, 2));
    console.log('PRODUCTS:', body.products);

    expect(response.status()).toBe(200);
    expect(body.products).toEqual(expect.any(Array));
    expect(body.products.length).toBeGreaterThan(0);
});