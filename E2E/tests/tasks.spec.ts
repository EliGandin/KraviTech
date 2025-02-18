import { test, expect } from "@playwright/test";

import { login } from "../util/login";
import { TestMenti, TestMentor } from "../consts";

test.describe("Tasks", () => {
  test("Mentor task handling", async ({ page }) => {
    // Login
    await login(page, TestMentor.email, TestMentor.password);

    // Navigate to tasks screen
    await page.getByRole("tab", { name: "Tasks" }).click();

    // Select a menti
    await page.getByText("Test Menti").click();

    // Add a task
    await page.getByText("Add New Task").click();
    await page.getByPlaceholder("Title").fill("Test Title");
    await page.getByPlaceholder("Description").fill("Test Description");
    await page.getByText("Add Task").click();

    // Add a subtask
    await page.locator("li").filter({ hasText: "Test Title" }).first().getByRole("button").click();
    await page.getByPlaceholder("Title").fill("Test Subtask");
    await page.getByPlaceholder("Description").fill("Test Description");
    await page.getByText("Add Subtask").click();

    // Assert subtask was added
    await expect(page.getByText("Subtask has been added successfully")).toBeVisible();

    // Change Status
    await page.getByRole("button", { name: "Change Status" }).click();
    await page.getByRole("combobox").click();
    await page.getByText("In Progress", { exact: true }).click();
    await page.getByRole("button", { name: "Confirm" }).click();

    // Assert the status changed
    await expect(page.getByText("Task status has been added successfully")).toBeVisible();
  });

  test("Menti task handling", async ({ page }) => {
    // Login
    await login(page, TestMenti.email, TestMenti.password);

    // Add a task
    await page.getByText("Add New Task").click();
    await page.getByPlaceholder("Title").fill("Test Title");
    await page.getByPlaceholder("Description").fill("Test Description");
    await page.getByText("Add Task").click();

    // Add a subtask
    await page.locator("li").filter({ hasText: "Test Title" }).first().getByRole("button").click();
    await page.getByPlaceholder("Title").fill("Test Subtask");
    await page.getByPlaceholder("Description").fill("Test Description");
    await page.getByText("Add Subtask").click();

    // Assert subtask was added
    await expect(page.getByText("Subtask has been added successfully")).toBeVisible();

    // Change Status
    await page.getByRole("button", { name: "Change Status" }).click();
    await page.getByRole("combobox").click();
    await page.getByText("In Progress", { exact: true }).click();
    await page.getByRole("button", { name: "Confirm" }).click();

    // Assert the status changed
    await expect(page.getByText("Task status has been added successfully")).toBeVisible();
  });
});