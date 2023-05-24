import { RegisterPage } from "../../pages/registerPage";

const LocalHostUrl = 'http://localhost:3000/'
const LocalHostUrl_Home = 'http://localhost:3000/home'

describe('Registro en Sistema', () => {
    beforeEach(() => {
        cy.visit(LocalHostUrl)
        expect(cy.config('viewportWidth')).to.equal(390)
        expect(cy.config('viewportHeight')).to.equal(848)
    });

    it('Registro_001 | ID_01 | Registro exitoso de usuario', () => {
        // Dado que el usuario a ingresado a la página de registro
        // Cuando el usuario ingresa Nombre, Email, Password y Repeat Password
        RegisterPage.submitRegister('','','','')
        // Entonces el usuario debería poder hacer click en el botón de Registrar
        RegisterPage.clickLogin()
        // y debería recibir una confirmación de Hola "Irene"
        RegisterPage.typeMessage('')
        // y deberia ser redirigido a la seccion de inicio
        cy.url().should('equal',LocalHostUrl_Home)

    });
    
    it('Registro_001 | ID_02 | Ingresar Nombre y Apellido Validos', () => {
        // Dado que el usuario a ingresado a la página de registro
        // Cuando el usuario ingresa Nombre Invalido, Email, Password y Repeat Password
        RegisterPage.submitRegister('','','','')
        // Entonces el usuario debería poder hacer click en el botón de Registrar
        RegisterPage.clickLogin()
        // y debería recibir un mensaje en pantalla de ingresar nombre y apellido invalidos
        RegisterPage.typeMessage('')
        // y deberia ser redirigido a la seccion de registro
        cy.url().should('equal',LocalHostUrl)
    
        });

    it('Registro_001 | ID_03 | Formato de Email incorrecto', () => {
        // Dado que el usuario a ingresado a la página de registro
        // Cuando el usuario ingresa Nombre, Email Invalido, Password y Repeat Password
        RegisterPage.submitRegister('','','','')
        // Entonces el usuario debería poder hacer click en el botón de Registrar
        RegisterPage.clickLogin()
        // y debería recibir un mensaje en pantalla de Email Invalido
        RegisterPage.typeMessage('')
        // y deberia ser redirigido a la seccion de registro
        cy.url().should('equal',LocalHostUrl)
        
        });   

    it('Registro_001 | ID_04 | Contraseña Debil', () => {
        // Dado que el usuario a ingresado a la página de registro
        // Cuando el usuario ingresa Nombre, Email, Password con < 6 caracteres y Repeat Password < 6 caracteres
        RegisterPage.submitRegister('','','','')
        // Entonces el usuario debería poder hacer click en el botón de Registrar
        RegisterPage.clickLogin()
        // y debería recibir un mensaje en pantalla el password debe contener > de 6 caracteres, al menos 1 Mayus y 1 caracter especial
        RegisterPage.typeMessage('')
        // y deberia ser redirigido a la seccion de registro
        cy.url().should('equal',LocalHostUrl)
            
        }); 

    it('Registro_001 | ID_04 | Password y Repeat Password no coinciden', () => {
        // Dado que el usuario a ingresado a la página de registro
        // Cuando el usuario ingresa Nombre, Email, Password y Repeat password distintas
        RegisterPage.submitRegister('','','','')
        // Entonces el usuario debería poder hacer click en el botón de Registrar
        RegisterPage.clickLogin()
        // y debería recibir un mensaje en pantalla el password y repeat password no coinciden
        RegisterPage.typeMessage('')
        // y deberia ser redirigido a la seccion de registro
        cy.url().should('equal',LocalHostUrl)
            
        });  
});