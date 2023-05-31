import { loginPage } from "../../../pages/loginPage"

const LocalHost_recoveryPass = 'http://localhost:3000/resetPassword/request'
const LocalHost_resetPass = '/resetPassword/request'
const LocalHost_register = 'http://localhost:3000/auth/register'
const LocalHostUrl_login = 'http://localhost:3000/auth/login'

describe('Login_003 | Elementos UI', () => {
    beforeEach(() => {
        cy.visit(LocalHostUrl_login)
    });

    it('Imagen del logo Pigmeo', () => {
    // Validacion de atributos y visibilidad  
        loginPage.imgLogin('alt','be.visible')
    });

    it('Tipo de input en Email', () => {
    // Validacion atributo type y placeholder 
        loginPage.inputEmail('type','email')
        loginPage.inputEmail('placeholder','Correo electrónico')
    });

    it('Tipo de input en Password', () => {
    // Validacion atributo type y placeholder 
        loginPage.inputPassword('type','password')
        loginPage.inputPassword('placeholder','Contraseña')
    });

    it('Tipo y Nombre del Button Login form', () => {
    // Valdiacion del texto en button y atributos 
        loginPage.buttonLogin('Iniciar sesión','type','submit')
    });

    it('Atributos y Nombre del enlace Recovery Password', () => {
    // Validacion del texto y atributos del enlace 
        loginPage.buttonRecovery('¿Olvidaste tu contraseña?','string',LocalHost_resetPass)
    });

    it.only('Redireccion enlace Button Recovery Password', () => {
    // Validacion de re-direccion del enlace Recovery Pass  
       loginPage.redireccionBtnRecovery(LocalHost_recoveryPass)
    });

    it('Atributos y Nombre del enlace Register User', () => {
    // Validacion del texto y atributos del enlace 
        cy.get('a').eq(1).each(($link) => {
            const href = $link.attr('href');
            expect(href).to.be.a('string').and.not.empty;
            expect(href).to.contain('http://localhost:3000/auth/register');
          });
    });

    it('Redireccion enlace Button Register User', () => {
    // Validacion de re-direccion del enlace Register 
        cy.get('a')
          .click()
          .then(()=>{
            cy.url().should('equal',LocalHost_register)
          })  
    });

});