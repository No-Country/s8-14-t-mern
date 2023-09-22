
const LocalHostUrl_name = 'http://localhost:3000/changename'
const LocalHostUrl_PersonalData = 'http://localhost:3000/personalData'

describe('UI test Cambiar Nombre completo', () => {
    beforeEach(() => {
        cy.visit(LocalHostUrl_name)
    });

    it('Elementos en Header', () => {
    // Elemento button volver     
        cy.get('header > button')
          .should('be.visible')
    // Elemento Cambiar nombre      
        cy.get('header > p')
          .should('contain','Cambiar nombre')
    });

    it('Elemento Nombre completo / input', () => {
    // Elemento label subtitulo del input "Nombre completo"     
        cy.assertionCheck('Nombre completo')
          .should('contain','Nombre completo')
          .and('be.visible')
    // Elemento input      
        cy.get('input').should('be.visible')  
    });

    it('Elementos guardad / Cancelar', () => {
    // Elemento guardar    
        cy.get('button').eq(1).should('contain','guardar')
    // Elemento cancelar    
        cy.get('a').should('contain','Cancelar')
    });
});