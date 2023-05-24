import { loginPage } from "../../pages/loginPage";

const LocalHostUrl = 'http://localhost:3000/'
const LocalHostUrl_login = 'http://localhost:3000/auth/login'

describe('Login en Sistema', () => {
    beforeEach(() => {
        cy.visit(LocalHostUrl_login)
        expect(cy.config('viewportWidth')).to.equal(390)
        expect(cy.config('viewportHeight')).to.equal(848)
    });

    
    it.only('Login_001 | ID_01 | Login Exitoso', () => {
        // Dado estoy en la página de inicio de sesión
        // Cuando Ingreso Email y password
        loginPage.submitLogin('user@mail.com','Abcd1234*')
        // Y el usuario hace clic en el button "Confirmar"
        loginPage.clickLogin()
        // Entonces el sistema debe redireccionar al usuario a la pagina principal"
        cy.url().should('equal',LocalHostUrl)
        // Y El sistema debe mostrar un mensaje de Bienvenida"
        loginPage.message('Hola')
    });

    it('Login_001 | ID_02 | Password Incorrecta', () => {
        // Dado estoy en la página de inicio de sesión
        // Cuando Ingreso Email y password
        loginPage.submitLogin('user1@mail.com','password123')
        // Y el usuario hace clic en el button "Confirmar"
        cy.get('button').click()
        // Entonces el sistema debe redireccionar al usuario a la pagina principal"
        cy.url().should('equal',LocalHostUrl_login)
        // Y El sistema debe mostrar un mensaje de Usuario no Registrado"  
        loginPage.message('Hola')
    });

    it('Login_001 | ID_03 | Todos los campos vacios', () => {
        // Dado estoy en la página de inicio de sesión
        // Cuando el Usuario deja los campos de Email y Password en blanco
        // Y el usuario hace clic en el button "Confirmar"
        cy.get('[href="/auth/login"]').click()
        cy.get('button').click()
        // Entonces el sistema debe redireccionar al usuario a la pagina de login"
        cy.url().should('equal',LocalHostUrl_login)
        // Y El sistema debe mostrar un mensaje de Email y Password requeridos"  
        cy.assertionCheck('required')
    });

    it('Login_001 | ID_04 | Campo de Password Vacio', () => {
        // Dado estoy en la página de inicio de sesión
        // Cuando el usuario ingresa Email y deja campo de password vacio
        loginPage.typeUsername('user2@mail.com')
        // Y el usuario hace clic en el button "Confirmar"
        cy.get('button').click()
        // Entonces el sistema debe redireccionar al usuario a la pagina de login"
        cy.url().should('equal',LocalHostUrl_login)
        // Y El sistema debe mostrar un mensaje de password es requerdio"  
        cy.assertionCheck('required')
    });

    it('Login_001 | ID_05 | Campo de Email Vacio', () => {
        // Dado estoy en la página de inicio de sesión
        // Cuando el usuario ingresa Email y deja campo de password vacio
        loginPage.typePassword('password3')
        // Y el usuario hace clic en el button "Confirmar"
        cy.get('button').click()
        // Entonces el sistema debe redireccionar al usuario a la pagina de login"
        cy.url().should('equal',LocalHostUrl_login)
        // Y El sistema debe mostrar un mensaje de Email es requerdio"  
        cy.assertionCheck('required')
    });
    
    it('Login_001 | ID_04 | Campo de Email Invalido', () => {
        // Dado estoy en la página de inicio de sesión
        // Cuando el usuario ingresa Email invalido y password
        loginPage.submitLogin('user3.ma','password5')
        // Y el usuario hace clic en el button "Confirmar"
        cy.get('button').click()
        // Entonces el sistema debe redireccionar al usuario a la pagina de login"
        cy.url().should('equal',LocalHostUrl_login)
        // Y El sistema debe mostrar un mensaje de ingresar Email de formato valido"  
        // cy.assertionCheck('required')
    });
});