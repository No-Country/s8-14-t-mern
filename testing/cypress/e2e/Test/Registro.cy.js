import { RegisterPage } from "../../pages/registerPage";

describe('Seccion Registro de Usuarios', () => {

    beforeEach(() => {
        cy.visit('/')
    });
    
    it('Registro_001 | Id_01 | Registro exitoso de usuario', () => {
        // Dado que el usuario a ingresado a la página de registro
        // Cuando el usuario ingresa su información personal
        RegisterPage.submitRegister()    
        // Entonces el usuario debería poder hacer click en el botón de Registrar
        RegisterPage.clickButton()
        // y debería recibir una confirmación de "registro exitoso"
        RegisterPage.typemessage('Registro de usuario exitoso')
    
    });

    
});