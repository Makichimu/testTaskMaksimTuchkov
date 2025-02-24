import { Page, expect } from '@playwright/test';

export class LibraryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  get internetCategory() {
    return this.page.locator('text=Internet');
  }

  get bookCard() {
    return this.page.locator('text=Hello! HTML5 & CSS3');
  }

  get cardContainer() {
    return this.page.locator('.card');
  }

  async selectInternetCategory() {
    await this.page.waitForSelector('text=Internet', { timeout: 5000 });
    await this.internetCategory.click();
  }

  async openBookCard() {
    await this.page.waitForSelector('text=Hello! HTML5 & CSS3', { timeout: 5000 });
    await this.bookCard.click();
    await expect(this.cardContainer).toBeVisible({ timeout: 5000 });
  }

  async validateBookDetails() {
    await expect(this.cardContainer).toContainText('Hello! HTML5 & CSS3');
    await expect(this.cardContainer).toContainText('Rob Crowther');
    await expect(this.cardContainer).toContainText('isbn : 1935182897');
    await expect(this.cardContainer).toContainText('pageCount : 325');
  }
}
