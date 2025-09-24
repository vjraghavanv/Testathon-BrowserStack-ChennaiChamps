import { test, type Page, type Locator, expect } from "@playwright/test";

export class InstallationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to Home page (base url)
   */
  async goto(url: string) {
    url;
  }
}
