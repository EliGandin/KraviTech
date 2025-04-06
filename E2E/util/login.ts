import { Page } from "@playwright/test";

import { baseURL } from "../consts";

export const login = async (page: Page, email: string, password: string) => {
  await page.goto(`${baseURL}/login`);
  await page.locator("input[name=\"email\"]").fill(email);
  await page.locator("input[name=\"password\"]").fill(password);
  await page.locator("button[type=\"submit\"]").click();
};