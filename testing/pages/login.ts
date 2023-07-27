import { expect, type Locator, type Page } from "@playwright/test";
//     await expect(page.getByRole('listitem')).toHaveCount(5);
export class LoginPage {
    //Variables
    readonly inputEmail: Locator
    readonly inputPass: Locator
    readonly btnIniciarSesion: Locator
    readonly btnPerfil: Locator
    readonly btnCerrarSesion: Locator
    readonly userName: Locator

    //contructor
    constructor(readonly page:Page){
      this.inputEmail = page.getByPlaceholder('Correo electrónico',{exact:true}) 
      this.inputPass = page.getByPlaceholder('Contraseña',{exact:true})
      this.btnIniciarSesion = page.getByText('Iniciar sesión',{exact:true})
      this.btnPerfil = page.getByRole('button',{name:'Perfil'})
      this.btnCerrarSesion = page.getByRole('listitem').filter({ hasText: 'Cerrar sesión'}) 
      this.userName = page.locator('//*[@id="root"]/main/div/div/p')
    }

    //methods
    async submitLogin(email: string, pass: string){
        await this.inputEmail.fill(email)
        await this.inputPass.fill(pass) 
        console.log('Email ingresado: ' + await this.inputEmail.inputValue())
        console.log('Contraseña ingresada: ' + await this.inputPass.inputValue())
    }

    async userLogin(email: string, pass: string){
        await this.inputEmail.fill(email)
        await this.inputPass.fill(pass) 
        await this.btnIniciarSesion.click() 
        console.log('Email ingresado: ' + await this.inputEmail.inputValue())
        console.log('Contraseña ingresada: ' + await this.inputPass.inputValue())
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

    async nameUser(value:string){
        const name = await this.userName.textContent()
        expect(name).toContain(value)
        console.log('Nombre obtenido del perfil: ' + name)
    }
}