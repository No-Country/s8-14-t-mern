import { test, expect, type Page } from "@playwright/test";
import { LoginPage } from "../pages/login";

let loginPage: LoginPage;
const loginURL = 'https://pigmeo-app.netlify.app/auth/login';
const URL = 'https://pigmeo-app.netlify.app'
const dataUser = ['userK@mail.com','Abcd1234*','NombreKApellidoK']

test.describe("Login en Sistema", () => {
 test.use({ viewport: { width: 390, height: 844 } });
    test.beforeEach(async ({ page }) => { 
      await page.goto(loginURL);
      loginPage = new LoginPage(page)
    });
       
    test("Login_001 | ID_01 | Login Exitoso", async ({ page }) => {
    // dado que el usuario abre la pagina de login    
        await expect(page).toHaveURL(/.*login/);
    // cuando usuario y contraseña    
        await loginPage.submitLogin(dataUser[0],dataUser[1])
    // y realiza click en iniciar session    
        await loginPage.btnSesion()
    // entonces se muestra el home del usuario    
        await expect(page).toHaveURL(/.*home/);
    // y realiza click en perfil    
        await loginPage.btnProfile()
    // entonces se ingresa al perfil del usuario    
        await expect(page).toHaveURL(/.*profile/);
    // y se muestra el nombre del usuario en sistema
        await expect(page.getByText(dataUser[2])).toContainText(dataUser[2]) 
    // y realiza click en cerrar session    
        await loginPage.btnSignOut()
    // entonces redirecciona al on-boarding   
        await expect(page).toHaveURL(URL);
    });

    test("Login_001 | ID_02 | Password Incorrecta", async ({ page }) => {
       
    });
   
    test("Login_001 | ID_03 | Todos los campos vacios", async ({ page }) => {
       
    });

    test("Login_001 | ID_04 | Campo de Password Vacio", async ({ page }) => {
       
    });

    test("Login_001 | ID_05 | Campo de Email Vacio", async ({ page }) => {
       
    });

    test("Login_001 | ID_06 | Campo de Email Invalido", async ({ page }) => {
       
    });

});
