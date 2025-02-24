import { BrowserContext, Page } from '@playwright/test';
import { BaseSteps } from './BaseSteps';
import { HomePage } from '../pages/HomePage';

export class HomePageSteps extends BaseSteps {
  get path(): string {
    return '/';
  }

  private homePage: HomePage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.homePage = new HomePage(page);
  }

  async openHomePage(): Promise<void> {
    await this.visit(this.path);
  }

  async waitForHomeLoaded(): Promise<void> {
    await this.homePage.waitForLoaded();
  }

  async goToLibrary(): Promise<void> {
    await this.homePage.goToLibrary();
  }
}
