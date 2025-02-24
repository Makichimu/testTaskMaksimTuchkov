import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput = 'input[placeholder="Enter email address here"]';
  readonly passwordInput = 'input[placeholder="Enter password here"]';
  readonly submitButton = 'input[type="button"][value="Submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }
}
