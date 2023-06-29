import { test, expect, type Page } from "@playwright/test";
import { TransactionPage } from "../pages/gestion_saldo";

let transactionPage: TransactionPage;
const loginURL = 'https://pigmeo-app.netlify.app/auth/login';
const URL = 'https://pigmeo-app.netlify.app'
const dataUser = ['userK@mail.com','Abcd1234*','NombreKApellidoK']

test.describe("Gestion de Saldo", () => {
    test.use({ viewport: { width: 390, height: 844 } });
       test.beforeEach(async ({ page }) => { 
        await page.goto(loginURL);
        transactionPage = new TransactionPage(page)
        await transactionPage.submitLogin(dataUser[0],dataUser[1])

       });
          
       test("Tr_001 | ID_01 | Saldo Insuficiente", async ({ page }) => {
        
       });
   
       test("Tr_001 | ID_02 | Operacion Invalida", async ({ page }) => {
          
       });
      
       test("Tr_001 | ID_03 | Transaccion Exitosa", async ({ page }) => {
          
       });
   
       test("Tr_001 | ID_04", async ({ page }) => {
          
       });
   
       test("Tr_001 | ID_05", async ({ page }) => {
          
       });
   
       test("Tr_001 | ID_06", async ({ page }) => {
          
       });

       test("Tr_001 | ID_07", async ({ page }) => {
          
       });

       test("Tr_001 | ID_08", async ({ page }) => {
          
       });
   
   });