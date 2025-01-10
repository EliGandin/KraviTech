import { test, expect } from "@playwright/test";
import axios from "axios";

const baseURL = "http://localhost:5172";
const menti = { id: 1, email: "yuval@test.com", password: "1234" };
const mentor = { id: 1, email: "amit@test.com", password: "1234" };
const admin = { id: 1, email: "eli@test.com", password: "1234" };
const INACTIVE_STATUS = "Inactive";


test.describe("Delete Profile", () => {
  test.describe("Deletion through profile page", () => {
    test("Delete Menti", async ({ page }) => {
      // Got To Login Page
      await page.goto(`${baseURL}/login`);

      // Login Menti
      await page.locator("input[name=\"email\"]").fill(menti.email);
      await page.locator("input[name=\"password\"]").fill(menti.password);
      await page.click("button:has-text('Login')");

      // Go to Profile Page
      await page.locator("a:has-text('Hello')").click();
      expect(page.locator(`p:has-text("${menti.email}")`)).toBeTruthy();

      // Delete Profile
      await page.locator("button:has-text('Delete Profile')").click();

      // Handle Swal2
      await page.locator("button:has-text('Yes')").click();

      // Assert that the user is deleted from the database
      const result = await axios.get(`http://localhost:8000/mentis/${menti.id}`);

      expect(result.status).toBe(200);
      expect(result.data.data.status).toBe("INACTIVE");
    });

    test("Delete Mentor", async ({ page }) => {
      // Got To Login Page
      await page.goto(`${baseURL}/login`);

      // Login Mentor
      await page.locator("input[name=\"email\"]").fill(mentor.email);
      await page.locator("input[name=\"password\"]").fill(mentor.password);
      await page.click("button:has-text('Login')");

      // Go to Profile Page
      await page.locator(`a:has-text('Hello')`).click();
      expect(page.locator(`p:has-text("${mentor.email}")`)).toBeTruthy();

      // Delete Profile
      await page.locator("button:has-text('Delete Profile')").click();

      // Handle Swal2
      await page.locator("button:has-text('Yes')").click();

      // Assert that the user is deleted from the database
      const result = await axios.get(`http://localhost:8000/mentors/${mentor.id}`);

      expect(result.status).toBe(200);
      expect(result.data.data.status).toBe("INACTIVE");
    });
  });

  test.describe("Deletion through table page", () => {
    test.beforeEach(async ({ page }) => {
      // Go to login page
      await page.goto(`${baseURL}/login`);

      // Login as admin
      await page.locator("input[name=\"email\"]").fill(admin.email);
      await page.locator("input[name=\"password\"]").fill(admin.password);
      await page.click("button:has-text('Login')");
    });

    test("Delete Menti", async ({ page }) => {
      // Go to table
      await page.locator("a:has-text('Mentis')").click();

      // Delete Menti
      await page.locator(`tr:has-text("${menti.email}") td:last-child button`).click();
      await page.getByRole("menuitem", { name: "Delete" }).click();
      await page.getByRole("button", { name: "Yes" }).click();

      // Assert that the user is deleted
      expect(page.locator(`tr:has-text("${menti.email}") td:has-text("${INACTIVE_STATUS}")`)).toBeTruthy();
    });

    test("Delete Mentor", async ({ page }) => {
      // Go to table
      await page.locator("a:has-text('Mentors')").click();

      // Delete Menti
      await page.locator(`tr:has-text("${mentor.email}") td:last-child button`).click();
      await page.getByRole("menuitem", { name: "Delete" }).click();
      await page.getByRole("button", { name: "Yes" }).click();

      // Assert that the user is deleted
      expect(page.locator(`tr:has-text("${mentor.email}") td:has-text("${INACTIVE_STATUS}")`)).toBeTruthy();
    });
  });
});
