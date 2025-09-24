import { expect, basePage as test } from "../fixture/basePage";
test.describe.configure({ mode: 'parallel' });

//Test Scenarios for Product Search Page
test("Product Search - Apple Products", { tag: "@ProductSearch-01" }, async ({ page, homePage }) => {
  await homePage.goto("https://testathon.live/");
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('div').filter({ hasText: /^Select Username$/ }).nth(2).click();
  await page.getByText('demouser', { exact: true }).click();
  await page.getByText('Select Password').click();
  await page.getByText('testingisfun99', { exact: true }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL("https://testathon.live/?signin=true");
  console.info("LogIn Successfull");
  await page.getByText('Apple').click();
  
  // Wait for filter to apply and products to update
  await page.waitForFunction(() => {
    const text = document.querySelector('.products-found span')?.textContent;
    return text?.includes('9 Product(s) found');
  }, { timeout: 10000 });
  
  // Extract and verify product count
  const productCountText = await page.locator('.products-found span').textContent();
  const productCount = parseInt(productCountText?.match(/(\d+) Product\(s\) found/)?.[1] || '0');
  expect(productCount).toBe(9);
  
  // Get all shelf items and extract product names
  const shelfItems = await page.locator('.shelf-item').all();
  const actualProducts = [];
  
  for (const item of shelfItems) {
    const productName = await item.locator('p.shelf-item__title').textContent();
    if (productName) {
      actualProducts.push(productName.trim());
    }
  }
  
  // Verify all actual products are in the expected Apple products list
  const appleProducts = [
    'iPhone 12',
    'iPhone 12 Pro Max', 
    'iPhone 11',
    'iPhone 11 Pro',
    'iPhone XS',
    'iPhone XR',
    'iPhone XS Max',
    'iPhone 12 Mini',
    'iPhone 12 Pro'
  ];
  
  for (const actualProduct of actualProducts) {
    expect(appleProducts).toContain(actualProduct);
  }
  
  console.info(`Found products: ${actualProducts.join(', ')}`);
});

test("Product Search - Samsung Products", { tag: "@ProductSearch-02" }, async ({ page, homePage }) => {
  await homePage.goto("https://testathon.live/");
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('div').filter({ hasText: /^Select Username$/ }).nth(2).click();
  await page.getByText('demouser', { exact: true }).click();
  await page.getByText('Select Password').click();
  await page.getByText('testingisfun99', { exact: true }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL("https://testathon.live/?signin=true");
  console.info("LogIn Successfull");
  await page.getByText('Samsung').click();
  
  // Wait for filter to apply and products to update
  await page.waitForFunction(() => {
    const text = document.querySelector('.products-found span')?.textContent;
    return text?.includes('7 Product(s) found');
  }, { timeout: 10000 });
  
  // Extract and verify product count
  const productCountText = await page.locator('.products-found span').textContent();
  const productCount = parseInt(productCountText?.match(/(\d+) Product\(s\) found/)?.[1] || '0');
  expect(productCount).toBe(7);
  
  // Get all shelf items and extract product names
  const shelfItems = await page.locator('.shelf-item').all();
  const actualProducts = [];
  
  for (const item of shelfItems) {
    const productName = await item.locator('p.shelf-item__title').textContent();
    if (productName) {
      actualProducts.push(productName.trim());
    }
  }
  
  // Verify only Samsung products are visible
  const samsungProducts = [
    'Galaxy S20',
    'Galaxy S20+',
    'Galaxy S20 Ultra',
    'Galaxy S10',
    'Galaxy S9',
    'Galaxy Note 20',
    'Galaxy Note 20 Ultra'
  ];
  
  for (const actualProduct of actualProducts) {
    expect(samsungProducts).toContain(actualProduct);
  }
  
  console.info(`Found products: ${actualProducts.join(', ')}`);
});

test("Product Search - Google Products", { tag: "@ProductSearch-03" }, async ({ page, homePage }) => {
  await homePage.goto("https://testathon.live/");
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('div').filter({ hasText: /^Select Username$/ }).nth(2).click();
  await page.getByText('demouser', { exact: true }).click();
  await page.getByText('Select Password').click();
  await page.getByText('testingisfun99', { exact: true }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL("https://testathon.live/?signin=true");
  console.info("LogIn Successfull");
  await page.getByText('Google').click();
  
  // Wait for filter to apply and products to update
  await page.waitForFunction(() => {
    const text = document.querySelector('.products-found span')?.textContent;
    return text?.includes('3 Product(s) found');
  }, { timeout: 10000 });
  
  // Extract and verify product count
  const productCountText = await page.locator('.products-found span').textContent();
  const productCount = parseInt(productCountText?.match(/(\d+) Product\(s\) found/)?.[1] || '0');
  expect(productCount).toBe(3);
  
  // Get all shelf items and extract product names
  const shelfItems = await page.locator('.shelf-item').all();
  const actualProducts = [];
  
  for (const item of shelfItems) {
    const productName = await item.locator('p.shelf-item__title').textContent();
    if (productName) {
      actualProducts.push(productName.trim());
    }
  }
  
  // Verify only Google products are visible
  const googleProducts = [
    'Pixel 4',
    'Pixel 3',
    'Pixel 2',
  ];
  
  for (const actualProduct of actualProducts) {
    expect(googleProducts).toContain(actualProduct);
  }
  
  console.info(`Found products: ${actualProducts.join(', ')}`);
});

test("Product Search - Products List Selection", { tag: "@ProductSearch-04" }, async ({ page, homePage }) => {
  await homePage.goto("https://testathon.live/");
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('div').filter({ hasText: /^Select Username$/ }).nth(2).click();
  await page.getByText('demouser', { exact: true }).click();
  await page.getByText('Select Password').click();
  await page.getByText('testingisfun99', { exact: true }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL("https://testathon.live/?signin=true");
  console.info("LogIn Successfull");
  await page.getByText('Apple').click();
  await page.getByText('9 Product(s) found.').isVisible();
  await page.getByText('Samsung').click();
  await page.getByText('16 Product(s) found.').isVisible();
  await page.getByText('Google').click();
  await page.getByText('19 Product(s) found.').isVisible();
  await page.getByText('OnePlus').click();
  await page.getByText('19 Product(s) found.').isVisible();
  console.info("Products List Selected");
});

test("Product Search - Products List Deselection", { tag: "@ProductSearch-05" }, async ({ page, homePage }) => {
  await homePage.goto("https://testathon.live/");
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('div').filter({ hasText: /^Select Username$/ }).nth(2).click();
  await page.getByText('demouser', { exact: true }).click();
  await page.getByText('Select Password').click();
  await page.getByText('testingisfun99', { exact: true }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL("https://testathon.live/?signin=true");
  console.info("LogIn Successfull");
  await page.getByText('Apple').click();
  await page.getByText('9 Product(s) found.').isVisible();
  await page.getByText('Samsung').click();
  await page.getByText('16 Product(s) found.').isVisible();
  await page.getByText('Google').click();
  await page.getByText('19 Product(s) found.').isVisible();
  await page.getByText('OnePlus').click();
  await page.getByText('19 Product(s) found.').isVisible();
  console.info("Products List Selected");
  await page.getByText('OnePlus').click();
  await page.getByText('19 Product(s) found.').isVisible();
  await page.getByText('Google').click();
  await page.getByText('16 Product(s) found.').isVisible();
  await page.getByText('Samsung').click();
  await page.getByText('9 Product(s) found.').isVisible();
  await page.getByText('Apple').click();
  await page.getByText('25 Product(s) found.').isVisible();
  console.info("Products List Unselected");
});