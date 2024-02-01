import { test, expect }  from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe(`Setup`, () => {
  test.beforeEach(async ({page}) => {
    await page.goto("/");
  });

  test("Page Title and Header", async ({ page }) => {
    await expect(page).toHaveTitle(/IT3049 Chat/i);
    await expect(page.getByRole(`heading`)).toContainText(/it-3049C chat/i);
  });

  test(`Page should have all the expected styles`, async ({ page }) => {
    const expectedStyles = [
      `/resources/vendor/bootstrap.min.css`,
      `/resources/vendor/fontawesome-free/css/all.min.css`,
      `/resources/css/styles.css`
    ];
    const styles = await page.$$eval(`link[rel="stylesheet"]`, els => els.map(el => new URL(el.href).pathname));
    await expect(styles).toEqual(expect.arrayContaining(expectedStyles));
  });

  test(`Page should have all the expected scripts`, async ({ page }) => {
    const expectedStyles = [
      `/resources/vendor/bootstrap.min.js`,
      `/resources/vendor/popper.min.js`,
      `/resources/vendor/jquery-3.5.1.slim.min.js`,
      `/resources/js/index.js`
    ];
    const styles = await page.$$eval(`script`, els => els.map(el => new URL(el.src).pathname));
    await expect(styles).toEqual(expect.arrayContaining(expectedStyles));
  });

});