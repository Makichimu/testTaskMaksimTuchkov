import { BrowserContext, Page } from '@playwright/test';
import { BaseSteps } from './BaseSteps';
import { LoginPage } from '../pages/LoginPage';
import { step } from 'allure-js-commons';

export class LoginPageSteps extends BaseSteps {
  get path(): string {
    return '/login';
  }

  private loginPage: LoginPage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.loginPage = new LoginPage(page);
  }

  async openPage(): Promise<void> {
    await step(`Open login page: "${this.path}"`, async () => {
      await this.visit(this.path);
    });
  }

  async assertLoginButtonIsVisible(): Promise<void> {
    await step('Assert that login button is visible', async () => {
      await this.page.waitForSelector(this.loginPage.submitButton, { state: 'visible' });
    });
  }

  async login(email: string, password: string): Promise<void> {
    await step(`Login with email: "${email}"`, async () => {
      await this.loginPage.login(email, password);
    });
  }
}
