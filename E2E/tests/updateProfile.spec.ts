import { test, expect } from "@playwright/test";
import { mentorMapper } from "../util/updateProfile.util";

const backendURL = "http://localhost:8000";
const baseURL = "http://localhost:5172";

test.describe("Update Profile", () => {
  test("Update Mentor Profile", async ({ page }) => {
    const id = 2;
    const updatedMentor = {
      "name": "ELDAD",
      "phone_number": "5",
      "email": "test@test.com",
      "field": "DATA",
      "company": "ggg",
      "position": "TTT",
      "experience": "HIGH",
    };

    // Fetch Mentor Data
    const request = await fetch(`${backendURL}/mentors/${id}`);
    const originalMentor = (await request.json()).data;
    const mentor = mentorMapper(originalMentor);

    // Locate it on the screen
    await page.goto(`${baseURL}/app/mentors/${id}`);

    expect(page.getByText(mentor.name)).toBeTruthy();
    expect(page.getByText(mentor.position)).toBeTruthy();
    expect(page.getByText(mentor.status)).toBeTruthy();
    expect(page.getByText(mentor.email)).toBeTruthy();
    expect(page.getByText(mentor.phone_number)).toBeTruthy();
    expect(page.getByText(mentor.company)).toBeTruthy();
    expect(page.getByText(mentor.field)).toBeTruthy();
    expect(page.getByText(mentor.experience)).toBeTruthy();

    // update the mentor data
    await fetch(`${backendURL}/mentors/UpdateProfile/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMentor),
    });

    // Refresh the page
    await page.reload();
    const formattedData = mentorMapper(updatedMentor);

    // Locate the mentor data on the screen
    expect(page.getByText(formattedData.name)).toBeTruthy();
    expect(page.getByText(formattedData.position)).toBeTruthy();
    expect(page.getByText(formattedData.email)).toBeTruthy();
    expect(page.getByText(formattedData.phone_number)).toBeTruthy();
    expect(page.getByText(formattedData.company)).toBeTruthy();
    expect(page.getByText(formattedData.field)).toBeTruthy();
    expect(page.getByText(formattedData.experience)).toBeTruthy();
  });
});