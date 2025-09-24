import { expect, basePage as test } from "../fixture/basePage";
test.describe.configure({ mode: 'parallel' });

//Test Scenarios for Add to cart Page
test("Add To Cart - Products Addition", { tag: "@AddToCart-01" }, async ({ page, homePage }) => {
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
  await page.locator('[id="3"]').getByText('Add to cart').click();
  await page.getByRole('img', { name: 'iPhone 12 Pro Max' }).nth(1).isVisible();
  await page.getByText('Apple Quantity: 1').isVisible();
  console.info('Products been added to cart');
});

test("Add To Cart - Increase Quantity", { tag: "@AddToCart-02" }, async ({ page, homePage }) => {
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
  await page.locator('[id="3"]').getByText('Add to cart').click();
  await page.getByRole('img', { name: 'iPhone 12 Pro Max' }).nth(1).isVisible();
  await page.getByText('Apple Quantity: 1').isVisible();
  console.info('Products been added to cart');
  
  // Increase quantity using loop and validate
  for (let i = 2; i <= 4; i++) {
    await page.getByRole('button', { name: '+' }).click();
    const fullText = await page.locator('p.desc').textContent();
    const quantityMatch = fullText?.match(/Quantity:\s*(\d+)/);
    const currentQuantity = quantityMatch ? parseInt(quantityMatch[1]) : 0;
    
    // Verify the extracted quantity
    expect(currentQuantity).toBe(i);
  }
});

test("Add To Cart - Decrease Quantity", { tag: "@AddToCart-03" }, async ({ page, homePage }) => {
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
  await page.locator('[id="3"]').getByText('Add to cart').click();
  await page.getByRole('img', { name: 'iPhone 12 Pro Max' }).nth(1).isVisible();
  await page.getByText('Apple Quantity: 1').isVisible();
  console.info('Products been added to cart');
  
  // Increase quantity using loop and validate
  for (let i = 2; i <= 4; i++) {
    await page.getByRole('button', { name: '+' }).click();
    const fullText = await page.locator('p.desc').textContent();
    const quantityMatch = fullText?.match(/Quantity:\s*(\d+)/);
    const currentQuantity = quantityMatch ? parseInt(quantityMatch[1]) : 0;
    
    // Verify the extracted quantity
    expect(currentQuantity).toBe(i);
  }
  
  // Decrease quantity using loop and validate
  for (let j = 3; j >= 1; j--) {
    await page.getByRole('button', { name: '-' }).click();
    const fullText = await page.locator('p.desc').textContent();
    const quantityMatch = fullText?.match(/Quantity:\s*(\d+)/);
    const currentQuantity = quantityMatch ? parseInt(quantityMatch[1]) : 0;
    
    // Verify the extracted quantity
    expect(currentQuantity).toBe(j);
  }
});

test("Add To Cart - Delete Item from Cart", { tag: "@AddToCart-04" }, async ({ page, homePage }) => {
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
  await page.locator('[id="3"]').getByText('Add to cart').click();
  await page.getByRole('img', { name: 'iPhone 12 Pro Max' }).nth(1).isVisible();
  await page.getByText('Apple Quantity: 1').isVisible();
  console.info('Products been added to cart');
  await page.locator('.shelf-item__del').click();
  await expect(page.getByRole('img', { name: 'iPhone 12 Pro Max' }).nth(1)).not.toBeVisible();
  console.info('Products been removed from cart');
});

test("Add To Cart - Price should be updated", { tag: "@AddToCart-05" }, async ({ page, homePage }) => {
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
  await page.locator('[id="3"]').getByText('Add to cart').click();
  
  // Verify initial price
  const initialPriceText = await page.locator('.sub-price__val').textContent();
  const initialPrice = parseFloat(initialPriceText?.match(/\$\s*([\d,]+\.?\d*)/)?.[1]?.replace(',', '') || '0');
  expect(initialPrice).toBe(1099.00);
  
  // Increase to quantity 3 and verify price
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '+' }).click();
  
  const updatedPriceText = await page.locator('.sub-price__val').textContent();
  const updatedPrice = parseFloat(updatedPriceText?.match(/\$\s*([\d,]+\.?\d*)/)?.[1]?.replace(',', '') || '0');
  expect(updatedPrice).toBe(3297.00);
  
  console.info(`Price updated from $${initialPrice} to $${updatedPrice}`);
  
  // Click - and verify price decreases
  await page.getByRole('button', { name: '-' }).click();
  const decreasedPriceText = await page.locator('.sub-price__val').textContent();
  const decreasedPrice = parseFloat(decreasedPriceText?.match(/\$\s*([\d,]+\.?\d*)/)?.[1]?.replace(',', '') || '0');
  expect(decreasedPrice).toBe(2198.00);
  
  // Click - again and verify price back to original
  await page.getByRole('button', { name: '-' }).click();
  const finalPriceText = await page.locator('.sub-price__val').textContent();
  const finalPrice = parseFloat(finalPriceText?.match(/\$\s*([\d,]+\.?\d*)/)?.[1]?.replace(',', '') || '0');
  expect(finalPrice).toBe(1099.00);
  console.info(`Price decreased to $${decreasedPrice}, then back to $${finalPrice}`);
});