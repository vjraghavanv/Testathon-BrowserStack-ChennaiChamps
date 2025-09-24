import { test, type Page, type Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to Home page (base url)
   */
  async goto(url: string) {
    await this.page.goto(url);
  }
}
