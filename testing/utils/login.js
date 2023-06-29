
const { expect } = require('@playwright/test');
 
  exports.LoginPage = class LoginPage {
    constructor(page){
        this.page = page;
        
    }

    async loginUser(email,pass){
    const inputEmail = await page.fill('input[name="email"]','userU@mail.com')
        await page.fill('input[name="password"]','Abcd1234*')
        await page.getByPlaceholder('Correo electrónico').click();
        await page.getByPlaceholder('Correo electrónico').fill(email);
        await page.getByPlaceholder().click();
        await page.getByPlaceholder('Contraseña').fill(pass);
    }
    
}
