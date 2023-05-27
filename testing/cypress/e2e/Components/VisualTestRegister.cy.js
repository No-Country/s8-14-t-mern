import { registerPage } from "../../pages/registerPage"

const LocalHost = 'http://localhost:3000/'
const LocalHostUrl = 'http://localhost:3000/home'
const LocalHost_register = 'http://localhost:3000/auth/register'
const LocalHostUrl_login = 'http://localhost:3000/auth/login'

describe('Testing Register Form elements', () => {
    beforeEach(() => {
        cy.visit(LocalHost_register)
    });

    it('Imagen logo Pigmeo', () => {
        
    });

    it('Titulo y Subtitulo', () => {
    // Validacion del contenido en los elementos Titulo y Subtitulo    
        registerPage.registerTitle('Create your account')
        registerPage.registerSubTitle('fill')
    });

    it('Tipo y Nombre del Input "Nombre Usuario"', () => {
    // Validacion del nombre Placeholder    
        registerPage.attrInputName('placeholder','Name and Surname')
    // Validacion del atributo type    
        registerPage.attrInputName('type','firstName')
    });

    it('Tipo y Nombre del Input "Apellido"', () => {
    // Validacion del nombre Placeholder 
        registerPage.attrInputLastname('placeholder','lastname')
    // Validacion del atributo type     
        registerPage.attrInputLastname('type','name')
    });

    it('Tipo y Nombre del input en "Email"', () => {
    // Validacion del nombre Placeholder     
        registerPage.attrInputEmail('placeholder','Email')
    // Validacion del atributo type     
        registerPage.attrInputEmail('type','email')
    });

    it('Tipo y Nombre del Input "Pais"', () => {
        
    });

    it('Tipo y Nombre del Input "Contraseña"', () => {
    // Validacion del nombre Placeholder     
        registerPage.attrInputPassword('placeholder','Password')
    // Validacion del atributo type     
        registerPage.attrInputPassword('type','password')
    });

    it('Tipo y Nombre del Input "Confirmar Contraseña"', () => {
    // Validacion del nombre Placeholder     
        registerPage.attrInputRepeatPassword('placeholder','Confirm password')
    // Validacion del atributo type     
        registerPage.attrInputRepeatPassword('type','password')
    });

    it('Input Checkbox "Terminos y Condiciones', () => {
        
    });

    it.only('Tipo y Nombre de Button "Registrarme', () => {
    // Validacio del atributo y nombre del button     
        registerPage.attrButtonLogin('type','submit','Create')
    });
});