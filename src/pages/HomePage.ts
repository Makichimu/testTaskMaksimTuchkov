import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly libraryLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.locator('nav.navbar >> text=Home');
    this.libraryLink = page.locator('nav.navbar >> text=Library');
  }

  async waitForLoaded() {
    await expect(this.homeLink).toBeVisible({ timeout: 5000 });
  }

  async goToLibrary() {
    await this.libraryLink.click();
  }
}
