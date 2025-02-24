import { BrowserContext, Page } from '@playwright/test';
import { LoginPageSteps } from './LoginPageSteps';
import { HomePageSteps } from './HomePageSteps';
import { LibraryPageSteps } from './LibraryPageSteps';

export class AppSteps {
  public loginPage: LoginPageSteps;
  public homePage: HomePageSteps;
  public libraryPage: LibraryPageSteps;

  constructor(page: Page, context: BrowserContext) {
    this.loginPage = new LoginPageSteps(page, context);
    this.homePage = new HomePageSteps(page, context);
    this.libraryPage = new LibraryPageSteps(page, context);
  }
}
