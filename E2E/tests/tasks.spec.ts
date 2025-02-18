import { test, expect } from "@playwright/test";

import { login } from "../util/login";
import { TestMentor } from "../consts";

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
    await page.locator("li").filter({ hasText: "Test Title" }).getByRole("button").click();
    await page.getByPlaceholder("Title").fill("Test Subtask");
    await page.getByPlaceholder("Description").fill("Test Description");

    // Assert subtask was added
    await expect(page.getByText("Subtask has been added successfully")).toBeVisible();

    // Change Status
    await page.getByRole("button", { name: "Change Status" }).click();
    await page.getByRole("combobox").click();
    await page.getByText("In Progress").click();
    await page.getByRole("button", { name: "Confirm" }).click();

    // Assert the status changed
    await expect(page.getByText("Task status has been added successfully")).toBeVisible();
  });
});

// test('test', async ({ page }) => {
//   await page.goto('http://localhost:5172/app/mentors/1/dashboard');
//   await page.getByRole('tab', { name: 'Tasks' }).click();
//   await page.getByText('Yuval Regev2 tasks').click();
//   await page.locator('li').filter({ hasText: 'Test TitleNEWTest' }).getByRole('button').click();
//   await page.getByPlaceholder('Title').click();
//   await page.getByPlaceholder('Description').click();
//   await page.getByRole('button', { name: 'Change Status' }).click();
//   await page.getByRole('combobox').click();
//   await page.getByLabel('In Progress').click();
//   await page.getByRole('button', { name: 'Confirm' }).click();
//   await page.getByRole('button', { name: 'Change Status' }).click();
//   await page.getByRole('combobox').click();
//   await page.getByLabel('Completed').click();
//   await page.getByRole('button', { name: 'Confirm' }).click();
//   await page.getByRole('button', { name: 'Close' }).click();
//   await page.locator('li').filter({ hasText: 'Test TitleCOMPLETEDTest' }).getByRole('button').click();
//   await page.getByRole('button', { name: 'Change Status' }).click();
//   await page.getByRole('combobox').click();
//   await page.getByLabel('In Progress').click();
//   await page.getByRole('button', { name: 'Confirm' }).click();
//   await page.getByRole('button', { name: 'Close' }).click();
// });