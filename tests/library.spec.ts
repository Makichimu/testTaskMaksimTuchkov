import { test } from '../src/fixtures/fixtures';

test.describe.serial('Library Book Validation', () => {
  test('Login and validate book details', async ({ app, credentials }) => {
    await app.loginPage.openPage();
    await app.loginPage.login(credentials.name, credentials.password);
    await app.loginPage.assertLoginButtonIsVisible();
    await app.homePage.waitForHomeLoaded();
    await app.homePage.goToLibrary();
    await app.libraryPage.openLibraryPage();
    await app.libraryPage.selectInternetCategory();
    await app.libraryPage.openBookCard();
    await app.libraryPage.validateBookDetails();
  });
});
