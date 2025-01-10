import { expect, Page, test } from "@playwright/test";
import { admin, baseURL, INACTIVE_STATUS, menti, mentor } from "./constants";

export const deleteMentiViaTable = () => {
  test("Delete Menti", async ({ page }) => {
    await adminLogin(page);

    // Go to table
    await page.locator("a:has-text('Mentis')").click();

    // Delete Menti
    await page.locator(`tr:has-text("${menti.email}") td:last-child button`).click();
    await page.getByRole("menuitem", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Yes" }).click();

    // Assert that the user is deleted
    expect(page.locator(`tr:has-text("${menti.email}") td:has-text("${INACTIVE_STATUS}")`)).toBeTruthy();
  });
};

export const deleteMentorViaTable = () => {
  test("Delete Mentor", async ({ page }) => {
    await adminLogin(page);

    // Go to table
    await page.locator("a:has-text('Mentors')").click();

    // Delete Menti
    await page.locator(`tr:has-text("${mentor.email}") td:last-child button`).click();
    await page.getByRole("menuitem", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Yes" }).click();

    // Assert that the user is deleted
    expect(page.locator(`tr:has-text("${mentor.email}") td:has-text("${INACTIVE_STATUS}")`)).toBeTruthy();
  });
};

const adminLogin = async (page: Page) => {
  // Go to login page
  await page.goto(`${baseURL}/login`);

  // Login as admin
  await page.locator("input[name=\"email\"]").fill(admin.email);
  await page.locator("input[name=\"password\"]").fill(admin.password);
  await page.click("button:has-text('Login')");
};