import { expect, test } from "@playwright/test";
import axios from "axios";

import { baseURL, menti, mentor } from "./constants";

export const deleteMentiViaProfile = () => {
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
};

export const deleteMentorViaProfile = () => {
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
};