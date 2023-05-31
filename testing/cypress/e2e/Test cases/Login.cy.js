import { loginPage } from "../../pages/loginPage";
import { homeElments } from "../../pages/homePage";

const LocalHostUrl = 'http://localhost:3000/home'
const LocalHostUrl_login = 'http://localhost:3000/auth/login'

describe('Login en Sistema', () => {
    beforeEach(() => {
        expect(cy.config('viewportWidth')).to.equal(390)
        expect(cy.config('viewportHeight')).to.equal(848)
    });

    
    it.only('Login_001 | ID_01 | Login Exitoso', () => {
    // Dado estoy en la página de inicio de sesión
        cy.visit(LocalHostUrl_login)
    // Cuando Ingreso Email valido y password valido 
        loginPage.submitLogin('user@mail.com','Abcd1234*')
    // Y el usuario hace clic en el button "Confirmar"
        loginPage.clickLogin()
        cy.wait(2000)
    // Entonces el sistema debe redireccionar al usuario a la pagina principal"
        cy.url().should('equal',LocalHostUrl)
    // Y El sistema debe mostrar un mensaje de Bienvenida Hola + Nombre de usuario logeado"
        homeElments.saludoHome()
    });

    it('Login_001 | ID_02 | Password Incorrecta', () => {
    // Dado estoy en la página de inicio de sesión
    // Cuando Ingreso Email valido y password invalido
        loginPage.submitLogin('user1@mail.com','password123')
    // Y el usuario hace clic en el button "Confirmar"
        cy.get('button').click()
    // Entonces el sistema debe mantenerse en la pagina de login
        cy.url().should('equal',LocalHostUrl_login)
    // Y El sistema debe mostrar un mensaje de Usuario y/o password invalidos"  
        loginPage.message('usuario y/o password invalidos')
    });

    it('Login_001 | ID_03 | Todos los campos vacios', () => {
    // Dado estoy en la página de inicio de sesión
    // Cuando el Usuario deja los campos de Email y Password en blanco
    // Y el usuario hace clic en el button "Confirmar"
        cy.get('button').click()
    // Entonces el sistema debe mantenerse en la pagina de login
        cy.url().should('equal',LocalHostUrl_login)
    // Y El sistema debe mostrar un mensaje de Email y Password requeridos"  
        loginPage.message('Email is required')
        loginPage.message('Password is required')
    });

    it('Login_001 | ID_04 | Campo de Password Vacio', () => {
    // Dado estoy en la página de inicio de sesión
    // Cuando el usuario ingresa Email valido y password vacio
        loginPage.typeUsername('user2@mail.com')
    // Y el usuario hace clic en el button "Confirmar"
        cy.get('button').click()
    // Entonces el sistema debe mantenerse en la pagina de login
        cy.url().should('equal',LocalHostUrl_login)
    // Y El sistema debe mostrar un mensaje de password es requerdio"  
        loginPage.message('Password is required')
    });

    it('Login_001 | ID_05 | Campo de Email Vacio', () => {
    // Dado estoy en la página de inicio de sesión
    // Cuando el usuario deja Email vacio y password valido
        loginPage.typePassword('Password3*')
    // Y el usuario hace clic en el button "Confirmar"
        cy.get('button').click()
    // Entonces el sistema debe mantenerse en la pagina de login
        cy.url().should('equal',LocalHostUrl_login)
    // Y El sistema debe mostrar un mensaje de Email es requerdio"  
        loginPage.message('Email is required')
    });
    
    it('Login_001 | ID_04 | Campo de Email Invalido', () => {
    // Dado estoy en la página de inicio de sesión
    // Cuando el usuario ingresa Email invalido y password valida
        loginPage.submitLogin('user3.ma','password5')
    // Y el usuario hace clic en el button "Confirmar"
        cy.get('button').click()
    // Entonces el sistema debe redireccionar al usuario a la pagina de login"
        cy.url().should('equal',LocalHostUrl_login)
    // Y El sistema debe mostrar un mensaje de ingresar Email de formato valido"  
        loginPage.message('usuario y/o password invalidos')
    });
});