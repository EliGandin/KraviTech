import { test, expect } from "@playwright/test";

const baseURL = "http://localhost:5172";

const admin = {
  email: "fiona.green@example.com",
  password: "1234",
};

test.describe("Signup Roles", () => {
  test("Menti Signup", async ({ page }) => {
    const menti = {
      name: "Test User Menti",
      email: "teste2e@test.com",
      phoneNumber: "0123456789",
      password: "1234",
      education: "Test University",
      experience: "Test Experience",
      goals: "Test Goals",
      comments: "Test Comments",
    };

    // Go to the menti signup page
    await page.goto(`${baseURL}/signup`);

    // Fill out the form
    await page.locator("input[name=\"name\"]").fill(menti.name);
    await page.locator("input[name=\"email\"]").fill(menti.email);
    await page.locator("input[name=\"phoneNumber\"]").fill(menti.phoneNumber);
    await page.locator("input[name=\"password\"]").fill(menti.password);
    await page.locator("input[name=\"confirmPassword\"]").fill(menti.password);
    await page.locator("input[name=\"education\"]").fill(menti.education);
    await page.locator("textarea[name=\"experience\"]").fill(menti.experience);
    await page.locator("textarea[name=\"goals\"]").fill(menti.goals);
    await page.locator("textarea[name=\"comments\"]").fill(menti.comments);

    // Submit the form
    await page.getByText("Create an account").click();

    // Handle Swal2
    await page.click("button:has-text('OK')");

    // Admin Login
    await page.goto(`${baseURL}/login`);
    await page.locator("input[name=\"email\"]").fill(admin.email);
    await page.locator("input[name=\"password\"]").fill(admin.password);
    await page.click("button:has-text('Login')");

    // Admin Approval
    await page.goto(`${baseURL}/app/admin/board`);
    await page.getByText(menti.name).click();
    await page.getByText("Approve").click();

    // Navigate to Mentis Component
    await page.goto(`${baseURL}/app/mentis`);

    // Assert that the menti is in the list
    expect(page.locator(`td:has-text("${menti.name}")`)).toBeTruthy();
    expect(page.locator(`td:has-text("${menti.email}")`)).toBeTruthy();
    expect(page.locator(`td:has-text("${menti.phoneNumber}")`)).toBeTruthy();
    expect(page.locator(`td:has-text("${menti.education}")`)).toBeTruthy();
    expect(page.locator(`td:has-text("${menti.experience}")`)).toBeTruthy();
    expect(page.locator(`td:has-text("${menti.goals}")`)).toBeTruthy();
    expect(page.locator(`td:has-text("${menti.comments}")`)).toBeTruthy();

    await page.close();
  });

  test("Mentor Signup", async ({ page }) => {
    const mentor = {
      name: "Test User Mentor",
      email: "teste2ementor@test.com",
      phoneNumber: "0123456789",
      password: "1234",
    };

    // Go to the menti signup page
    await page.goto(`${baseURL}/signup`);
    // Switch to mentor signup
    await page.click("button:has-text('Mentor')");

    // Fill out the form
    await page.locator("input[name=\"name\"]").fill(mentor.name);
    await page.locator("input[name=\"email\"]").fill(mentor.email);
    await page.locator("input[name=\"phoneNumber\"]").fill(mentor.phoneNumber);
    await page.locator("input[name=\"password\"]").fill(mentor.password);
    await page.locator("input[name=\"confirmPassword\"]").fill(mentor.password);

    // Combobox selection
    await page.getByText("Select field").click();
    await page.getByText("Data").click();
    await page.getByText("Specify Experience").click();
    await page.getByText("5+ years").click();

    // Submit the form
    await page.getByRole("button", { name: "Create an account" }).click();

    // Handle Swal2
    // await page.click("button:has-text('OK')");

    // Admin Login
    await page.goto(`${baseURL}/login`);
    await page.locator("input[name=\"email\"]").fill(admin.email);
    await page.locator("input[name=\"password\"]").fill(admin.password);
    await page.click("button:has-text('Login')");

    // Admin Approval
    await page.goto(`${baseURL}/app/admin/board`);
    await page.getByText(mentor.name).click();
    await page.getByText("Approve").click();

    // Navigate to Mentors Component
    await page.goto(`${baseURL}/app/mentors`);

    // Assert that the menti is in the list
    expect(page.locator(`td:has-text("${mentor.name}")`)).toBeTruthy();
    expect(page.locator(`td:has-text("${mentor.email}")`)).toBeTruthy();
    expect(page.locator(`td:has-text("${mentor.phoneNumber}")`)).toBeTruthy();

    await page.close();
  });
});
