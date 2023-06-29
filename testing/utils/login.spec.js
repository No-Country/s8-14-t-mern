
import { test, expect } from "@playwright/test";
const LoginPage = require('./login')

test.describe("Login al Sistema", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("https://pigmeo-app.netlify.app/auth/login");
    
  });

  test("Assertion Button Iniciar Sesion", async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL(/.*login/);
    await page.getByText('Iniciar sesión',{exact:true})
    await page.getByRole('button',{name: 'Iniciar sesión'}).click()
    await page.getByText('Email es requerido',{exact:true})
    
  });

  async function titlePage(page) {
    await expect(page).toHaveURL(/.*login/);
  }

  const user = [
    'userk@mail.com',
    'Abcd1234*',
    'NombreKApellidoK'
  ]

  test("Login Exitoso", async ({ page }) => {
    await titlePage(page)
    await page.goto('https://pigmeo-app.netlify.app/auth/login');
    await page.getByPlaceholder('Correo electrónico').click();
    await page.getByPlaceholder('Correo electrónico').fill(user[0]);
    await page.getByPlaceholder('Contraseña').fill(user[1]);
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByRole('button', { name: 'Perfil' }).click();
    await expect(page.getByText(user[2])).toContainText('NombreKApellidoK') 
    await expect(page.getByRole('listitem')).toHaveCount(5);
    await page.getByText('Cerrar sesión').click();
  });

  test.only("Login Exitoso utilizando POM", async ({ page }) => {
   
    const loginpage = new LoginPage(page);

  });

});
