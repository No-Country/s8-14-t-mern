import { loginPage } from "../../pages/loginPage";
import { homeElments } from "../../pages/homePage";

const LocalHostUrl = 'http://localhost:3000/'
const LocalHostUrl_Home = 'http://localhost:3000/home'
const LocalHostUrl_login = 'http://localhost:3000/auth/login'

describe('UI test en Home', () => {
   beforeEach(() => {
      loginPage.userLogin(LocalHostUrl_login,'user@mail.com','Abcd1234*')
   });

   it.only('Elementos en Header', () => {
      // Esperamos 2s para cargar elementos en el DOM
      cy.wait(2000)
       // Saludos Bienvenida Validado con nombre de Login segun Usuario
       homeElments.saludoHome()
       // Icono Alerta
       cy.get('span').eq(0).should('be.visible')
       // Elemento Binvenida
       cy.get('div').eq(2).should('be.visible')
       //Logo
       cy.get('div').eq(3).should('be.visible')
       // Titulo de Total Disponible
       cy.assertionCheck('Total disponible')
       // Saldo Disponible
       cy.get('div').eq(5).should('be.visible')
       // Icono Ocultar
       cy.get('span').eq(1).should('be.visible')
   });

   it('Seccion Gestion de Saldo', () => {
      // Titulo 1er bloque "Agregar Dinero" 
      cy.assertionCheck('Agregar dinero')
      // Elemento Agregar Dinero
      cy.get('div').eq(8).should('be.visible')
      // Titulo 2er bloque "Transferir Dinero" 
      cy.assertionCheck('Transferir dinero')
      // Elemento Agregar Dinero
      cy.get('div').eq(9).should('be.visible')
      // Titulo 3er bloque "Locales con QR" 
      cy.assertionCheck('Locales con QR')
      // Elemento Agregar Dinero
      cy.get('div').eq(10).should('be.visible')
      // Titulo 4er bloque "Recargas" 
      cy.assertionCheck('Recarga')
      // Elemento Agregar Dinero
      cy.get('div').eq(11).should('exist')
   });


   it('Slider Beneficios', () => { 
      // Titulo Beneficios
      cy.assertionCheck('Beneficios')
      // titulo 1er Bloque
      cy.assertionCheck('Coto')
      // Elemento 1er bloque
      cy.get('div').eq(12).should('be.visible') 
      // titulo 2do Bloque
      cy.assertionCheck('Mc')
      // Elemento 2do bloque
      cy.get('div').eq(14).should('be.visible')
      // titulo 3er Bloque
      cy.assertionCheck('Burger')
      // Elemento 3er bloque
      cy.get('div').eq(16).should('exist')
      // titulo 4to Bloque
      cy.assertionCheck('Vea')
      // Elemento 4to bloque
      cy.get('div').eq(18).should('exist')
      // titulo 5to Bloque
      cy.assertionCheck('Vea')
      // Elemento 5to bloque
      cy.get('div').eq(20).should('exist')
    });

    it('Elemento Actividad', () => {
      // Titulo Actividad
      cy.assertionCheck('Actividad')
      // Elemento Actividad
      cy.get('div').eq(33)
      // Elemento Img dentro de Actividad
      cy.get('div').eq(34)
       
    });

    it('Menu de Navegacion Tab', () => {
      // Button Home en TabNav 
      cy.get('button').eq(0).should('be.visible') 
      // Button Transferencia en TabNav 
      cy.get('button').eq(1).should('be.visible') 
      // Button QR en TabNav 
      cy.get('button').eq(2).should('be.visible') 
      // Button Beneficios en TabNav 
      cy.get('button').eq(3).should('be.visible') 
      // Button Perfil en TabNav 
      cy.get('button').eq(4).should('be.visible') 
   });
});