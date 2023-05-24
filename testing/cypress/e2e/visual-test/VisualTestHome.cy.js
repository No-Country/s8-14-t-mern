
const LocalHostUrl = 'http://localhost:3000/'
const LocalHostUrl_Home = 'http://localhost:3000/home'

describe('UI test en Home', () => {
    beforeEach(() => {
        cy.visit(LocalHostUrl)
    });

    it('Seccion Menu de Navegacion Tab', () => {
       // Button Home en TabNav 
       cy.get('button').eq(0).should('be.visible') 
       // Button Transferencia en TabNav 
       cy.get('button').eq(1).should('be.visible') 
       // Button QR en TabNav 
       cy.get('button').eq(2).should('be.visible') 
       // Button Portfolio en TabNav 
       cy.get('button').eq(3).should('be.visible') 
       // Button Perfil en TabNav 
       cy.get('button').eq(4).should('be.visible') 
    });

    it('Seccion Beneficios', () => { 
       // Saludos Bienvenida 
       cy.assertionCheck('Hola irene')
       // Elemento Binvenida
       cy.get('div').eq(2).should('be.visible')
       //Logo
       cy.get('div').eq(3).should('be.visible')
       // Titulo de Total Disponible
       cy.assertionCheck('Total disponible')
       // Saldo Disponible
       cy.get('div').eq(5).should('be.visible')
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

    it('Seccion Gestion de Saldo', () => {
       // Titulo 1er bloque "Agregar Dinero" 
       cy.assertionCheck('Agregar dinero')
       // Elemento Agregar Dinero
       cy.get('div').eq(24).should('be.visible')
       // Titulo 2er bloque "Transferir Dinero" 
       cy.assertionCheck('Transferir dinero')
       // Elemento Agregar Dinero
       cy.get('div').eq(26).should('be.visible')
       // Titulo 3er bloque "Locales con QR" 
       cy.assertionCheck('Locales con QR')
       // Elemento Agregar Dinero
       cy.get('div').eq(28).should('be.visible')
       // Titulo 4er bloque "Recargas" 
       cy.assertionCheck('Recarga')
       // Elemento Agregar Dinero
       cy.get('div').eq(30).should('exist')
    });

    it.only('Seccion Actividad', () => {
       // Titulo Actividad
       cy.assertionCheck('Actividad')
       // Elemento Actividad
       cy.get('div').eq(33)
       // Elemento Img dentro de Actividad
       cy.get('div').eq(34)
       
    });
});