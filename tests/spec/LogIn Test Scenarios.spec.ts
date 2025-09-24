import { expect, basePage as test } from "../fixture/basePage";
test.describe.configure({ mode: 'parallel' });

//Test Scenarios for Login Page
test("Valid Credentials - SignIn", { tag: "@LogInScenario-01" }, async ({ page, homePage }) => {
  await homePage.goto("https://testathon.live/");
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('div').filter({ hasText: /^Select Username$/ }).nth(2).click();
  await page.getByText('demouser', { exact: true }).click();
  await page.getByText('Select Password').click();
  await page.getByText('testingisfun99', { exact: true }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL("https://testathon.live/?signin=true");
  console.info("LogIn Successfull");
});

test("Valid Credentials - LogOut", { tag: "@LogOutScenario-02" }, async ({ page, homePage }) => {
  await homePage.goto("https://testathon.live/");
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('div').filter({ hasText: /^Select Username$/ }).nth(2).click();
  await page.getByText('demouser', { exact: true }).click();
  await page.getByText('Select Password').click();
  await page.getByText('testingisfun99', { exact: true }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL("https://testathon.live/?signin=true");
  console.info("LogIn Successfull");
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL("https://testathon.live");
  console.info("LogOut Successfull");
});

test("Valid Credentials - Correct Redirect", { tag: "@RedirectScenario-03" }, async ({ page, homePage }) => {
  await homePage.goto("https://testathon.live/");
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('div').filter({ hasText: /^Select Username$/ }).nth(2).click();
  await page.getByText('demouser', { exact: true }).click();
  await page.getByText('Select Password').click();
  await page.getByText('testingisfun99', { exact: true }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL("https://testathon.live/?signin=true");
  console.info("LogIn Successfull");
  await page.getByText('iPhone 12', { exact: true }).isVisible();
});

test("Invalid Credentials - Blank fields", { tag: "@InvalidScenario-04" }, async ({ page, homePage }) => {
  await homePage.goto("https://testathon.live/");
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL("https://testathon.live/signin");
  console.info("Error message");
  await page.getByRole('heading', { name: 'Invalid Username' }).isVisible();
});

test("Invalid Credentials - Invalid Password", { tag: "@InvalidScenario-05" }, async ({ page, homePage }) => {
  await homePage.goto("https://testathon.live/");
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('div').filter({ hasText: /^Select Username$/ }).nth(2).click();
  await page.getByText('demouser', { exact: true }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL("https://testathon.live/signin");
  console.info("Error message");
  await page.getByRole('heading', { name: 'Invalid Password' }).isVisible();
});

test("Locked Credentials - Account Locked", { tag: "@LockedScenario-06" }, async ({ page, homePage }) => {
  await homePage.goto("https://testathon.live/");
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('div').filter({ hasText: /^Select Username$/ }).nth(2).click();
  await page.getByText('locked_user', { exact: true }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL("https://testathon.live/signin");
  console.info("Error message");
  await page.getByRole('heading', { name: 'Your account has been locked.' }).isVisible();
});