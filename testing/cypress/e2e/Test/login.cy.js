import { loginPage } from "../../pages/loginPage";

describe('Seccion Pruebas en Login', () => {
    beforeEach(() => {
        cy.visit('/')
        expect(cy.config('viewportWidth')).to.equal(380)
        expect(cy.config('viewportHeight')).to.equal(670)
    });

    it('Login_000 | Check elementos UI', () => {
        // Imagen Logo
        // Input Email
        // Imagen Password
        // Button iniciar sesion
        // Texto 1
        // Buttons con opciones de ingreso
    });

    it('Login_001 | Id_01 | Ingreso al sistema - Credenciales validas', () => {
        // Dado estoy en la página de inicio de sesión
        // Cuando Ingreso usuario y password
        loginPage.submitLogin('user1@mail.com','password1')
        // Y el usuario hace clic en el button "Confirmar"
        loginPage.clickLogin()
        // Entonces el sistema debe redireccionar al usuario a la pagina principal"
        cy.url().should('equal','/')
        // Y El sistema debe mostrar un mensaje de "Bienvenido User1"
    });

    it('Login_001 | Id_02 | Ingreso al sistema - Credenciales invalidas', () => {
        // Dado estoy en la página de inicio de sesión
        // Cuando Ingreso usuario y password
        loginPage.submitLogin('user1@mail.com','password123')
        // Y el usuario hace clic en el button "Confirmar"
        loginPage.submitLogin()
        // Y El sistema debe mostrar un mensaje de usuario no registrado"
        loginPage.errorMessage('Password o Usuario Incorrecto')
    });

    it('Login_001 | Id_03 | Todos los campos vacios', () => {
        // Dado estoy en la página de inicio de sesión
        // Cuando Ingreso usuario y password
        loginPage.submitLogin('','')
        // Y el usuario hace clic en el button "Confirmar"
        loginPage.clickLogin()
        // Y El sistema debe mostrar un mensaje de "Completar todos los campos"
        loginPage.errorMessage('Completar todos los campos')
    });
    
    it('Login_001 | Id_04 | Password sin datos', () => {
        // Dado estoy en la página de inicio de sesión
        // Cuando Ingreso usuario y password
        loginPage.submitLogin('user2@mail.com','')
        // Y el usuario hace clic en el button "Confirmar"
        loginPage.clickLogin()
        // Y El sistema debe mostrar un mensaje de Ingresar Password"
        loginPage.errorMessage('Ingresar Password')
    });

    it('Login_001 | Id_05 | Email sin datos', () => {
        // Dado estoy en la página de inicio de sesión
        // Cuando Ingreso usuario y password
        loginPage.submitLogin('','password3')
        // Y el usuario hace clic en el button "Confirmar"
        loginPage.clickLogin()
        // Y El sistema debe mostrar un mensaje de Ingresar Email"
        loginPage.errorMessage('Ingresar Password')
    });

    it('Login_001 | Id_06 | Email Invalido', () => {
        // Dado estoy en la página de inicio de sesión
        // Cuando Ingreso usuario y password
        loginPage.submitLogin('user3@ma','password5')
        // Y el usuario hace clic en el button "Confirmar"
        loginPage.clickLogin()
        // Y El sistema debe mostrar un mensaje del formato Email Invalido"
        loginPage.errorMessage('Email Invalido')
    });

});