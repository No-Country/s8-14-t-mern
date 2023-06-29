// @ts-check
import { test, expect, type Page } from "@playwright/test";
import { LoginPage } from "./login";
//AAA
const loginURL = 'https://pigmeo-app.netlify.app/auth/login';


test.describe("Login al Sistema", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto(loginURL);
    const loginElements = new LoginPage(page);
  });

  async function titlePage(page:Page) {
    await expect(page).toHaveURL(/.*login/);
  }

  test("Assertion Button Iniciar Sesion", async ({ page }) => {
    // Assertions use the expect API.
    await page.getByText('Iniciar sesión',{exact:true})
    await page.getByRole('button',{name: 'Iniciar sesión'}).click()
  });

  test.only("Login Exitoso", async ({ page }) => {
   

  });

});