import { registerPage } from "../../pages/registerPage";

const LocalHostUrl_Home = 'http://localhost:3000/home'
const LocalHostUrl_register = 'http://localhost:3000/auth/register'

describe('Registro en Sistema', () => {
    beforeEach(() => {
        cy.visit(LocalHostUrl_register)
        expect(cy.config('viewportWidth')).to.equal(390)
        expect(cy.config('viewportHeight')).to.equal(848)
    });

    it('check items', () => {
      cy.get('input').eq(0)
      cy.get('button').eq(0)
    });

    it.only('Registro_001 | ID_01 | Registro exitoso de usuario', () => {
        // Dado que el usuario a ingresado a la página de registro
        // Cuando el usuario ingresa Nombre, Email, Password y Repeat Password
        registerPage.submitRegister('userAA@mail.com','ApellidoA','NombreA','Abcd1234*','Abcd1234*')
        // Entonces el usuario debería poder hacer click en el botón de Registrar
        registerPage.clickCreate()
        // y debería recibir una confirmación de Hola "Irene"
        registerPage.sistemMessage('Hola')
        // y deberia ser redirigido a la seccion de inicio
        cy.url().should('equal',LocalHostUrl_Home)

    });
    
    it('Registro_001 | ID_02 | Ingresar Nombre y Apellido Validos', () => {
        // Dado que el usuario a ingresado a la página de registro
        // Cuando el usuario ingresa Nombre Invalido, Email, Password y Repeat Password
        registerPage.submitRegister('','','','')
        // Entonces el usuario debería poder hacer click en el botón de Registrar
        registerPage.clickLogin()
        // y debería recibir un mensaje en pantalla de ingresar nombre y apellido invalidos
        registerPage.typeMessage('')
        // y deberia ser redirigido a la seccion de registro
        cy.url().should('equal',LocalHostUrl)
    
        });

    it('Registro_001 | ID_03 | Formato de Email incorrecto', () => {
        // Dado que el usuario a ingresado a la página de registro
        // Cuando el usuario ingresa Nombre, Email Invalido, Password y Repeat Password
        registerPage.submitRegister('','','','')
        // Entonces el usuario debería poder hacer click en el botón de Registrar
        registerPage.clickLogin()
        // y debería recibir un mensaje en pantalla de Email Invalido
        registerPage.typeMessage('')
        // y deberia ser redirigido a la seccion de registro
        cy.url().should('equal',LocalHostUrl)
        
        });   

    it('Registro_001 | ID_04 | Contraseña Debil', () => {
        // Dado que el usuario a ingresado a la página de registro
        // Cuando el usuario ingresa Nombre, Email, Password con < 6 caracteres y Repeat Password < 6 caracteres
        registerPage.submitRegister('','','','')
        // Entonces el usuario debería poder hacer click en el botón de Registrar
        registerPage.clickLogin()
        // y debería recibir un mensaje en pantalla el password debe contener > de 6 caracteres, al menos 1 Mayus y 1 caracter especial
        registerPage.typeMessage('')
        // y deberia ser redirigido a la seccion de registro
        cy.url().should('equal',LocalHostUrl)
            
        }); 

    it('Registro_001 | ID_04 | Password y Repeat Password no coinciden', () => {
        // Dado que el usuario a ingresado a la página de registro
        // Cuando el usuario ingresa Nombre, Email, Password y Repeat password distintas
        registerPage.submitRegister('','','','')
        // Entonces el usuario debería poder hacer click en el botón de Registrar
        registerPage.clickLogin()
        // y debería recibir un mensaje en pantalla el password y repeat password no coinciden
        registerPage.typeMessage('')
        // y deberia ser redirigido a la seccion de registro
        cy.url().should('equal',LocalHostUrl)
            
        });  
});