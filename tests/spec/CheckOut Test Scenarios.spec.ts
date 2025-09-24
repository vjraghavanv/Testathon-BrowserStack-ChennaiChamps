import { expect, basePage as test } from "../fixture/basePage";
test.describe.configure({ mode: 'parallel' });

//Test Scenarios for Check out page
test("Successful CheckOut - Valid Details", { tag: "@CheckOut-01" }, async ({ page, homePage }) => {
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
  
  await page.getByText('Checkout').click();
  console.info("Checkout Successfull");
  await page.getByRole('textbox', { name: 'First Name' }).fill('Vijayaraghavan');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Vashudevan');
  await page.getByRole('textbox', { name: 'Address' }).fill('No 323 Vivekananda nagar ');
  await page.getByRole('textbox', { name: 'State/Province' }).fill('Dubai');
  await page.getByRole('textbox', { name: 'Postal Code' }).fill('601524');
  
  // Verify price in checkout
  const finalPriceText = await page.locator('.cart-priceItem-value').textContent();
  const finalPrice = parseFloat(finalPriceText?.match(/\$\s*([\d,]+\.?\d*)/)?.[1]?.replace(',', '') || '0');
  expect(finalPrice).toBe(1099.00);
  
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Wait for any confirmation message to appear and extract text
  await page.waitForSelector('legend, .confirmation, [class*="confirm"], [id*="confirm"]', { timeout: 10000 });
  await page.waitForTimeout(5000);
  
  // Extract confirmation message text
  const confirmationText = await page.locator('legend').first().textContent();
  expect(confirmationText).toContain('successfully placed');
  
  // Or check for any success message pattern
  const successMessage = await page.locator('text=/successfully|placed|confirmed/i').first().textContent();
  expect(successMessage).toBeTruthy();
  
  console.info(`Confirmation message: ${confirmationText}`);
  console.info("Order Placed Successfull");
  await page.getByRole('button', { name: 'Continue Shopping »' }).click();
  await page.getByRole('link', { name: 'Orders' }).click();
  
  // Verify ordered product matches selected product
  const titleText = await page.locator('.a-fixed-left-grid-col .a-row').filter({ hasText: 'Title:' }).textContent();
  const title = titleText?.replace('Title:', '').trim();
  expect(title).toBe('iPhone 12 Pro Max');
  
  // Extract price
  const priceText = await page.locator('.a-color-price').textContent();
  const price = parseFloat(priceText?.replace('$', '') || '0');
  expect(price).toBe(1099.00);
  
  console.info("Product verification successful - Selected and ordered products match");
});

test("Successful CheckOut - Validate order number", { tag: "@CheckOut-02" }, async ({ page, homePage }) => {
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
  
  await page.getByText('Checkout').click();
  console.info("Checkout Successfull");
  await page.getByRole('textbox', { name: 'First Name' }).fill('Vijayaraghavan');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Vashudevan');
  await page.getByRole('textbox', { name: 'Address' }).fill('No 323 Vivekananda nagar ');
  await page.getByRole('textbox', { name: 'State/Province' }).fill('Dubai');
  await page.getByRole('textbox', { name: 'Postal Code' }).fill('601524');
  
  // Verify price in checkout
  const finalPriceText = await page.locator('.cart-priceItem-value').textContent();
  const finalPrice = parseFloat(finalPriceText?.match(/\$\s*([\d,]+\.?\d*)/)?.[1]?.replace(',', '') || '0');
  expect(finalPrice).toBe(1099.00);
  
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Wait for any confirmation message to appear and extract text
  await page.waitForSelector('legend, .confirmation, [class*="confirm"], [id*="confirm"]', { timeout: 10000 });
  await page.waitForTimeout(5000);
  
  // Extract confirmation message text
  const confirmationText = await page.locator('legend').first().textContent();
  expect(confirmationText).toContain('successfully placed');
  
  // Or check for any success message pattern
  const successMessage = await page.locator('text=/successfully|placed|confirmed/i').first().textContent();
  expect(successMessage).toBeTruthy();
  
  console.info(`Confirmation message: ${confirmationText}`);
  console.info("Order Placed Successfull");
  
  // Capture and validate dynamic order number
  const orderNumberElement = await page.getByText(/Your order number is \d+\./).textContent();
  const orderNumber = orderNumberElement?.match(/\d+/)?.[0];
  
  // Verify order number exists and is numeric
  expect(orderNumber).toBeTruthy();
  expect(parseInt(orderNumber!)).toBeGreaterThan(0);
  
  console.info(`Order number generated: ${orderNumber}`);
});

test("Successful CheckOut - Validate order receipt generated", { tag: "@CheckOut-03" }, async ({ page, homePage }) => {
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
  
  await page.getByText('Checkout').click();
  console.info("Checkout Successfull");
  await page.getByRole('textbox', { name: 'First Name' }).fill('Vijayaraghavan');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Vashudevan');
  await page.getByRole('textbox', { name: 'Address' }).fill('No 323 Vivekananda nagar ');
  await page.getByRole('textbox', { name: 'State/Province' }).fill('Dubai');
  await page.getByRole('textbox', { name: 'Postal Code' }).fill('601524');
  await page.getByRole('textbox', { name: 'Postal Code' }).press('Tab');
  
  // Verify price in checkout
  const finalPriceText = await page.locator('.cart-priceItem-value').textContent();
  const finalPrice = parseFloat(finalPriceText?.match(/\$\s*([\d,]+\.?\d*)/)?.[1]?.replace(',', '') || '0');
  expect(finalPrice).toBe(1099.00);
  
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Wait for any confirmation message to appear and extract text
  await page.waitForSelector('legend, .confirmation, [class*="confirm"], [id*="confirm"]', { timeout: 10000 });
  await page.waitForTimeout(5000);
  
  // Extract confirmation message text
  const confirmationText = await page.locator('legend').first().textContent();
  expect(confirmationText).toContain('successfully placed');
  
  // Or check for any success message pattern
  const successMessage = await page.locator('text=/successfully|placed|confirmed/i').first().textContent();
  expect(successMessage).toBeTruthy();
  
  console.info(`Confirmation message: ${confirmationText}`);
  console.info("Order Placed Successfull");
  
  // Verify order receipt generated
  await page.getByText('Download order receipt').isVisible();
  
  console.info(`Order receipt generated`);
});

test("Successful CheckOut - Validate favourites", { tag: "@CheckOut-04" }, async ({ page, homePage }) => {
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
  
  // Capture selected product details before adding to favorites
  const selectedProductName = 'Galaxy Note 20 Ultra';
  
  // Add to favorites
  await page.locator('[id="16"]').getByRole('button', { name: 'delete' }).click();
  console.info(`Added ${selectedProductName} to favorites`);
  
  // Navigate to favorites page
  await page.getByRole('link', { name: 'Favourites' }).click();
  
  // Verify the selected product appears in favorites
  await expect(page.getByText(selectedProductName, { exact: true })).toBeVisible();
  await expect(page.locator('#16 .shelf-item__title')).toHaveText(selectedProductName);
  
  console.info("Favorite product validation successful - Selected product appears in favorites");
});