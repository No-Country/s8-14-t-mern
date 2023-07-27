// @ts-check
import { test, expect, type Page } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { userK, userM } from "../pages/usuarios";

let loginPage: LoginPage
const loginURL = 'https://pigmeo-app.netlify.app/auth/login';
const URL = 'https://pigmeo-app.netlify.app'

test.describe("Gestion de Saldo", () => {
    test.use({ viewport: { width: 390, height: 844 } });
       test.beforeEach(async ({ page }) => { 
        await page.goto(loginURL);
        loginPage = new LoginPage(page)
        await loginPage.userLogin(userK.email,userK.password)
       });

test.afterEach( async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus)
        console.log(`Did not run as expected, ended up at ${page.url()}`);
    // clean up all the data we created for this test through API calls
    });     
     
    test("Tr_001 | ID_01 | Saldo Insuficiente", async ({ page }) => {
    // Dado que tengo una cuenta de origen con un saldo de $1000
    // Y tengo una cuenta de destino n° xxxxx
    // Cuando intento transferir $2000 de la cuenta de origen a la cuenta de destino
    // Y selecciono Motivo
    // Y confirmo la transaccion
    // Entonces deberia recibir un mensaje de error indicando fondos insuficientes
    // Y el saldo de la cuenta array[16] origen no deberia cambiar "Se valida desde una request api/users"
    // y cancelamos operacion
    // Y el saldo de la cuenta de destino no deberia cambiar
    // y el saldo en total disponible $ "Se valida con saldo total en el localStorage"
    });
   
    test("Tr_001 | ID_02 | Limite de caracteres numerios ingresados", async ({ page }) => {
          
    });
      
    test("Tr_001 | ID_03 | Transferir monto minimo", async ({ page }) => {
    // Y tengo saldo suficiente para realizar una transferencia
    // se valida la exitencia de saldo > $20
    // Cuando ingreso la direccion de la billetera de destino y el monto de la transferencia
    // Y confirmo CB
    // y ingreso monto $100
    // Y selecciono Motivo
    // Y confirmo la transaccion
    // Entonces deberia ver un mensaje de exito indicando que la tranasferencia se ha realizado exitosamente
    // y realizo clic en volver al home
    // Y debería ver un registro con ultimos movimientos -$100 
    // Y mi saldo se ha actualizado de manera correcta, restando el monto transferido (se compara con balance del localStorage)
    // Y el destinatario debería recibir la transferencia exitosamente
    // Y el destinatario debería ver un registro de la transacción en su lista de transacciones recientes
    });
   
    test("Tr_001 | ID_04 | Transferir con monto Negativo", async ({ page }) => {
          
    });
   
    test("Tr_001 | ID_05 | Transferir con monto < permitido", async ({ page }) => {
          
    });
   
    test("Tr_001 | ID_06 | Transferir con monto > al disponilbe", async ({ page }) => {
          
    });

    test("Tr_001 | ID_07 | Transferir saldo total", async ({ page }) => {
          
    });

    test("Tr_001 | ID_08 | Transferir con decimales", async ({ page }) => {
          
    });
   
   });