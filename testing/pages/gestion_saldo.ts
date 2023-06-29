import { expect, type Locator, type Page } from "@playwright/test";

export class TransactionPage {
    //Variables
    readonly inputEmail: Locator
    readonly inputPass: Locator
    readonly btnIniciarSesion: Locator

    //contructor
    constructor(readonly page:Page){
      this.inputEmail = page.getByPlaceholder('Correo electrónico',{exact:true})
      this.inputPass = page.getByPlaceholder('Contraseña',{exact:true})
      this.btnIniciarSesion = page.getByText('Iniciar sesión',{exact:true})
    }

    //methods
    async submitLogin(email: string, pass: string){
        await this.inputEmail.fill(email)
        await this.inputPass.fill(pass) 
        await this.btnIniciarSesion.click() 
    }

}