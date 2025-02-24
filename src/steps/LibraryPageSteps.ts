import { BrowserContext, Page } from '@playwright/test';
import { BaseSteps } from './BaseSteps';
import { LibraryPage } from '../pages/LibraryPage';

export class LibraryPageSteps extends BaseSteps {
  get path(): string {
    return '/categories';
  }

  private libraryPage: LibraryPage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.libraryPage = new LibraryPage(page);
  }

  async openLibraryPage(): Promise<void> {
    await this.visit(this.path);
  }

  async selectInternetCategory(): Promise<void> {
    await this.libraryPage.selectInternetCategory();
  }

  async openBookCard(): Promise<void> {
    await this.libraryPage.openBookCard();
  }

  async validateBookDetails(): Promise<void> {
    await this.libraryPage.validateBookDetails();
  }
}
