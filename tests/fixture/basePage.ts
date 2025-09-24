import test from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { InstallationPage } from "../pages/installationPage";
import path from 'path';

type MyFixture = {
  homePage: HomePage;
  installationPage: InstallationPage;
  forEachTest: void;
};

export const basePage = test.extend<MyFixture>({
  forEachTest: [async ({ page }, use, testInfo) => {
    // This code runs before every test.
    const specFilePath = testInfo.file;
    const specFileName = path.basename(specFilePath);
    // Set the session name in BrowserStack
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionName', arguments: { name: `${specFileName} - ${testInfo.title} `} })}`);
 
    await use();
    // This code runs after every test (to update status in browserstack).
    console.log(`>>>>> Test finished: ${testInfo.title} with status: ${testInfo.status}`);
    if (testInfo.status === "passed") {
      await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed' } })}`);
    } else if (testInfo.status === "timedOut") {
      await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'timedOut' } })}`);
    } else if (testInfo.status === "skipped") {
      await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'skipped' } })}`);
    } else {
      await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed' } })}`);
    }
  }, { auto: true }],  // automatically starts for every test.
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  installationPage: async ({ page }, use) => {
    await use(new InstallationPage(page));
  },
});

export { expect } from '@playwright/test';

