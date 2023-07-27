// @ts-check
import { test, expect, type Page } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { userK, userM } from "../pages/usuarios";

let loginPage: LoginPage;
const loginURL = 'https://pigmeo-app.netlify.app/auth/login';
const URL = 'https://pigmeo-app.netlify.app'

test.describe("Login en Sistema", () => {
 test.use({ viewport: { width: 390, height: 844 } });
    test.beforeEach(async ({ page }) => { 
      await page.goto(loginURL);
      loginPage = new LoginPage(page)
    });

test.afterEach( async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus)
        console.log(`Did not run as expected, ended up at ${page.url()}`);
    });    
   
    test("Login_001 | ID_01 | Login Exitoso", async ({ page }) => {
    // dado que el usuario abre la pagina de login    
        await expect(page).toHaveURL(/.*login/);
    // cuando usuario y contraseña    
        await loginPage.submitLogin(userK.email,userK.password)
    // y realiza click en iniciar session     
        await loginPage.btnSesion() 
    // entonces se muestra el home del usuario    
        await expect(page).toHaveURL(/.*home/);
    // y realiza click en perfil    
        await loginPage.btnProfile()
        await page.waitForTimeout(3000)
    // entonces se ingresa al perfil del usuario    
        await expect(page).toHaveURL(/.*profile/);
    // y se comprueba el nombre del usuario en sistema
        await loginPage.nameUser(userK.nombre)
    // y realiza click en cerrar session    
        await loginPage.btnSignOut()
    // entonces redirecciona al on-boarding   
        await expect(page).toHaveURL(URL);
    });

    test("Login_001 | ID_02 | Password Incorrecta", async ({ page }) => {
    // dado que el usuario abre la pagina de login    
        await expect(page).toHaveURL(/.*login/);
    // cuando usuario y contraseña    
        await loginPage.submitLogin('userK@mail.com','Abcd12345*')
    // y realiza click en iniciar session    
        await loginPage.btnSesion()
    // el sistema muestra un mensaje en pantalla usuario y/o password incorrecto
        await expect(page.getByText('invalid email or password')).toBeVisible
    // y se mantiene en url
        await expect(page).toHaveURL(/.*login/);       
    });
   
    test("Login_001 | ID_03 | Todos los campos vacios", async ({ page }) => {
    // dado que el usuario abre la pagina de login    
        await expect(page).toHaveURL(/.*login/);
    // y realiza click en iniciar session    
        await loginPage.btnSesion()
    // el sistema muestra un mensaje en pantalla Email y password requeridos
        await expect(page.getByText('Email es requerido')).toBeVisible()
        await expect(page.getByText('Contraseña es requerida')).toBeVisible()
    // y se mantiene en url
        await expect(page).toHaveURL(/.*login/);   
    });

    test("Login_001 | ID_04 | Campo de Password Vacio", async ({ page }) => {
    // Dado estoy en la página de inicio de sesión
        await expect(page).toHaveURL(/.*login/);
    // Cuando el usuario ingresa Email valido y password vacio
        await loginPage.submitLogin('userK@mail.com','')
    // Y el usuario hace clic en el button "Confirmar"
        await loginPage.btnSesion()
    // Y El sistema debe mostrar un mensaje de password es requerdio"    
        await expect(page.getByText('Contraseña es requerida')).toBeVisible()
    // Entonces el sistema debe mantenerse en la pagina de login 
        await expect(page).toHaveURL(/.*login/);
    });

    test("Login_001 | ID_05 | Campo de Email Vacio", async ({ page }) => {
    // Dado estoy en la página de inicio de sesión
        await expect(page).toHaveURL(/.*login/);
    // Cuando el usuario deja Email vacio y password valido
        await loginPage.submitLogin('','Abcd1234*')
    // Y el usuario hace clic en el button "Confirmar"
        await loginPage.btnSesion()
    // Entonces el sistema debe mantenerse en la pagina de login
        await expect(page.getByText('Email es requerido')).toBeVisible()
    // Y El sistema debe mostrar un mensaje de Email es requerdio" 
        await expect(page).toHaveURL(/.*login/);
    });

});
