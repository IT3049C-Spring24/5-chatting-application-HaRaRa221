import { test, expect }  from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe(`Layout`, () => {
  test.beforeEach(async ({page}) => {
    await page.goto("/");
  });

  test(`should have a jumbotron div with an h1`, async ({ page }) => {
    const jumbotron = await page.getByRole(`heading`);
    await expect(jumbotron).toContainText(/3049C Chat/);
    await expect(jumbotron).toHaveClass("display-4");
  });

  test(`jumbotron includes an input field for the name`, async ({ page }) => {
    const jumbotron = await page.locator(`.jumbotron`);
    const input = await jumbotron.locator(`input`);

    await expect(input).toHaveAttribute("type", "text");
    await expect(input).toHaveAttribute("id", "my-name-input");
    await expect(input).toHaveClass("form-control");
  });

  test(`page has a field for the message`, async ({ page }) => {
    const messageField = await page.locator(`#my-message`);
    await expect(messageField).toHaveAttribute("type", "text");
    await expect(messageField).toHaveClass("form-control");
  });
});