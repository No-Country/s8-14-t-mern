import { loginPage } from "../../pages/loginPage";
import { localStorage } from "../../pages/localStorage";
import { fetchApis } from "../../pages/fetchApi";

const LocalHost = 'http://localhost:3000'
const LocalHostUrl_login = 'http://localhost:3000/auth/login'
const localApi = 'http://localhost:9000/api/v1/pigmeo/users'
const usersApi = 'http://localhost:9000/api/v1/pigmeo/users/login'
const LocalHostUrl = 'http://localhost:3000/home'

describe('Web Properties Request', () => {
    beforeEach(() => {
      cy.session('login',()=>{
      cy.visit(LocalHostUrl_login)
      loginPage.userLogin('user@mail.com','Abcd1234*')
      })
    });

    it('Html Request', () => {
      cy.request(LocalHost)
        .then((response)=>{
            expect(response).property('status').to.eq(200)
        })
    });

    it('Validacion elementos en LocalStorage / Cookies', () => {
        localStorage.localElements()
    });

    it('Crear json con Lista de Datos y Parametros Api Users', () => {
        fetchApis.jsonGenerate(localApi)
    });

});