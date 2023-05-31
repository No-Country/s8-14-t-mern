import { loginPage } from "../../../pages/loginPage";
import { profile } from "../../../pages/profile";

const LocalHostUrl_Profile = 'http//localhost:3000/profile'
const LocalHostUrl_PersonalData = 'http//localhost:3000/personalData'
const LocalHostUrl_login = 'http://localhost:3000/auth/login'
const LocalHostUrl = 'http://localhost:3000/home'

describe('UI test en Perfil', () => {
    beforeEach(() => {
      loginPage.userLogin(LocalHostUrl_login,'user@mail.com','Abcd1234*') 

    });

    it('Button Retornar al Home', () => {
      cy.wait(2000)
    // Realizamos clic en Button Perfil del menu Tab
      cy.get('button').eq(4).click()
    // Button X    
      cy.get('button').eq(0).should('be.visible')
    // Realizamos clic en Button Perfil del menu Tab
    });
    
    it('Imagen Avatar de perfil', () => {
      cy.wait(2000)
    // Realizamos clic en Button Perfil del menu Tab
     cy.get('button').eq(4).click()
    // Elemento Imagen perfil  
      cy.get('img').should('be.visible')
    });

    it('Nombre de perfil usuario', () => {
      cy.wait(2000)
    // Realizamos clic en Button Perfil del menu Tab
     cy.get('button').eq(4).click()
    // Validacion Nombre de Usuario   
      profile.dataUsers()
    // 
    });

    it('Nombres de elementos lista Profile', () => {
      cy.wait(2000)
    // Realizamos clic en Button Perfil del menu Tab
      cy.get('button').eq(4).click()
    // Titulo 1er elemento de la lista    
      cy.assertionCheck('Mis datos')
    // 1er elemento de la lista
      cy.get('li').eq(0).should('be.visible')
    // Titulo 2do elemento de la lista    
      cy.assertionCheck('Invitar amigos')
    // 2do elemento de la lista
      cy.get('li').eq(1).should('be.visible')
    // Titulo 3er elemento de la lista    
      cy.assertionCheck('Chateá con nosotros')
    // 3er elemento de la lista
      cy.get('li').eq(2).should('be.visible')
    // Titulo 4to elemento de la lista    
      cy.assertionCheck('Preguntas frecuentes')
    // 4to elemento de la lista
      cy.get('li').eq(3).should('be.visible')
    // Titulo 5to elemento de la lista    
      cy.assertionCheck('Cerrar sesión')
    // 1er elemento de la lista
      cy.get('li').eq(4).should('be.visible')
    });

    it('Validacion lista de elementos en Profile', () => {
      cy.wait(2000)
    // Realizamos clic en Button Perfil del menu Tab
      cy.get('button').eq(4).click()    
        cy.get('ul > li').then((list)=>{
          expect(list, 'Elementos en lista Profile').to.have.length(5)
          expect(list.eq(0), '1 elemento').to.contain('Mis datos')
          expect(list.eq(1), '2 elemento').to.contain('Invitar amigos')
          expect(list.eq(2), '3 elemento').to.contain('Chateá con nosotros')
          expect(list.eq(3), '4 elemento').to.contain('Preguntas frecuentes')
          expect(list.eq(4), '5 elemento').to.contain('Cerrar sesión')
        })
    });
});