import { loginPage } from "../../pages/loginPage";
import { localStorage } from "../../pages/localStorage";
import { fetchApis } from "../../pages/fetchApi";

const LocalHostUrl_login = 'http://localhost:3000/auth/login'
const localApi = 'http://localhost:9000/api/v1/pigmeo/users'

describe('Html Head Properties', () => {
    beforeEach(() => {
       cy.visit(LocalHostUrl_login)
       loginPage.userLogin('user@mail.com','Abcd1234*')
    });

    it.only('Proiedades en Head del Html', () => {
      
    });

    it('Validacion elementos en LocalStorage / Cookies', () => {
        localStorage.localElements()
    });

    it('Crear json con Lista de Datos y Parametros Api Users', () => {
        fetchApis.jsonGenerate(localApi)
    });

});