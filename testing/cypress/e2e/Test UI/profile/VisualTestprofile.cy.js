
const LocalHostUrl_Profile = 'http//localhost:3000/profile'
const LocalHostUrl_PersonalData = 'http//localhost:3000/personalData'

describe('UI test en Perfil', () => {
    beforeEach(() => {
      cy.visit(LocalHostUrl_Profile)  
    });
    
    it('elementos en header', () => {
    // Elemento Imagen perfil  
        cy.get('header > div > img').should('be.visible')
    // Button X    
        cy.get('a').should('be.visible')
    // Subtitulo Nombre    
        cy.get('header > div > div > p').eq(0).should('be.visible')
    // Subtitulo Dni    
        cy.get('header > div > div > p').eq(1).should('be.visible')
    });

    it('Seccion Profile', () => {
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
        cy.get('ul > li').then((list,name)=>{
          expect(list, 'Elementos en lista Profile').to.have.length(5)
          expect(list.eq(0), '1 elemento').to.contain('Mis datos')
          expect(list.eq(1), '2 elemento').to.contain('Invitar amigos')
          expect(list.eq(2), '3 elemento').to.contain('Chateá con nosotros')
          expect(list.eq(3), '4 elemento').to.contain('Preguntas frecuentes')
          expect(list.eq(4), '5 elemento').to.contain('Cerrar sesión')
        })
    });
});