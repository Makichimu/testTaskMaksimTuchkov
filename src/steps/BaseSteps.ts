import { BrowserContext, Page } from '@playwright/test';
import { step } from 'allure-js-commons';

export abstract class BaseSteps {
  public abstract get path(): string;

  constructor(
    protected readonly page: Page,
    protected readonly context: BrowserContext
  ) {}

  async visit(url: string): Promise<void> {
    await step(`Open URL "${url}"`, async () => {
      await this.page.goto(url, { waitUntil: 'networkidle' });
    });
  }

  async reload(): Promise<void> {
    const currentUrl = this.page.url();
    await step(`Reload page "${currentUrl}"`, async () => {
      await this.page.reload({ waitUntil: 'domcontentloaded' });
    });
  }
}
