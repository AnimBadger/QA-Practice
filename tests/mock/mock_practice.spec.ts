// @ts-check
import { test, expect } from "@playwright/test";
import tags from "./mock_data.json";

test.describe("Mock Practice Test", () => {
  test("should mock API response", async ({ page }) => {
    // Intercept the API request and provide a mock response
    await page.route("**/api/productsList", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill({
          body: JSON.stringify(tags),
          contentType: "application/json",
        });
      } else {
        route.continue();
      }
    });

    // Navigate to the page that makes the API call
    await page.goto("https://automationexercise.com/api/productsList");
    expect(await page.textContent("body")).toBe(JSON.stringify(tags));
  });
});
