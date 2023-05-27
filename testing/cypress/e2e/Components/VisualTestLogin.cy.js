import { loginPage } from "../../pages/loginPage"

const LocalHost_recoveryPass = 'http://localhost:3000/resetPassword/request/'
const LocalHost_resetPass = '/resetPassword/request'
const LocalHost_register = 'http://localhost:3000/auth/register'
const LocalHostUrl_login = 'http://localhost:3000/auth/login'

describe('Testing login elements', () => {
    beforeEach(() => {
        cy.visit(LocalHostUrl_login)
    });

    it('Imagen del logo Pigmeo', () => {
    // Validacion de atributos y visibilidad  
        loginPage.imgLogin('alt','be.visible')
    });

    it('Label text de input Email', () => {
    // Validacion del texto en label  
        loginPage.labelEmailLogin('Email address')
    });

    it('Tipo de input en Email', () => {
    // Validacion atributo type y placeholder 
        loginPage.inputEmail('type','email')
        loginPage.inputEmail('placeholder','enter your email')
    });

    it('Label text de input Password', () => {
    // Validacion del texto en label  
        loginPage.labelPasswordLogin('Password')
    });

    it('Tipo de input en Password', () => {
    // Validacion atributo type y placeholder 
        loginPage.inputPassword('type','password')
        loginPage.inputPassword('placeholder','enter your password')
    });

    it('Tipo y Nombre del Button Login form', () => {
    // Valdiacion del texto en button y atributos 
        loginPage.buttonLogin('Log in','type','submit')
    });

    it.only('Atributos y Nombre del enlace Recovery Password', () => {
    // Validacion del texto y atributos del enlace 
        loginPage.buttonRecovery('forgot my password','string',LocalHost_resetPass)
    });

    it('Redireccion enlace Button Recovery Password', () => {
    // Validacion de re-direccion del enlace Recovery Pass  
       loginPage.redireccionBtnRecovery(LocalHost_recoveryPass)
    });

    it('Nombre del enlace Register User', () => {
        cy.get('a').eq(1).each(($link) => {
            const href = $link.attr('href');
            expect(href).to.be.a('string').and.not.empty;
            expect(href).to.contain('http://localhost:3000/auth/register');
          });
    });

    it('Redireccion enlace Button Register User', () => {
        cy.get('a')
          .click()
          .then(()=>{
            cy.url().should('equal',LocalHost_register)
          })  
    });

});