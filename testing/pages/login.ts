import { expect, type Locator, type Page } from "@playwright/test";

//     await expect(page.getByRole('listitem')).toHaveCount(5);


export class LoginPage {
    //Variables
    readonly inputEmail: Locator
    readonly inputPass: Locator
    readonly btnIniciarSesion: Locator
    readonly btnPerfil: Locator
    readonly btnCerrarSesion: Locator

    //contructor
    constructor(readonly page:Page){
      this.inputEmail = page.getByPlaceholder('Correo electrónico',{exact:true})
      this.inputPass = page.getByPlaceholder('Contraseña',{exact:true})
      this.btnIniciarSesion = page.getByText('Iniciar sesión',{exact:true})
      this.btnPerfil = page.getByRole('button',{name:'Perfil'})
      this.btnCerrarSesion = page.getByRole('listitem').filter({ hasText: 'Cerrar sesión'}) 
    }

    //methods
    async submitLogin(email: string, pass: string){
        await this.inputEmail.fill(email)
        await this.inputPass.fill(pass) 
    }

    async btnSesion(){
        await this.btnIniciarSesion.click() 
    }

    async btnProfile(){
        await this.btnPerfil.click()
    }

    async btnSignOut(){
        await this.btnCerrarSesion.click()
    }

    async userText(){
        const text = await this.page.$('p')
        const valor = await text?.textContent()
        console.log(valor)
    }
}