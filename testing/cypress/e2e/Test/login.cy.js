import { loginPage } from "../../pages/loginPage";

describe('Seccion Pruebas en Login', () => {
    beforeEach(() => {
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

    it('Login_001 | Ingreso al sistema - Credenciales validas', () => {
        // Dado estoy en la página de inicio de sesión
        cy.visit('https://dev.tahouse.casa/login')
        // Cuando Ingreso usuraio y password
        loginPage.submitLogin('admintahouse@mail.com','root123')
        // Y el usuario hace clic en el button "Confirmar"
        // Entonces el sistema debe redireccionar al usuario a la pagina principal"
        cy.url().should('equal','https://dev.tahouse.casa')
        // Y El sistema debe mostrar un mensaje de Bienvenida"
    });
    
});