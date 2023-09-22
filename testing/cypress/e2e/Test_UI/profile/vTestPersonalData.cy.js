
const LocalHostUrl_Profile = 'http://localhost:3000/profile'
const LocalHostUrl_PersonalData = 'http://localhost:3000/personalData'

describe('UI Test en Perfil / Mis datos', () => {
    beforeEach(() => {
        cy.visit(LocalHostUrl_PersonalData)
        
    });

    it('Validacion Elementos en Header', () => {
    // Titulo
        cy.get('header')
          .should('contain','Datos Personales')
    // Button Volver
        cy.get('button').eq(0)
          .should('be.visible')        
    // Imagen Personal     
        cy.get('main > div > div').should('be.visible')
    // Button Agregar Imagen  
        cy.get('button').eq(1)
          .should('contain','Agregar')
          .and('be.visible')
    });

    it('Validacion Elementos lista de Datos Personales', () => {
    // Elementos y titulos en la lista ul  
        cy.get('ul > li').then((list)=>{
            expect(list, 'Elementos en lista Datos Personales').to.have.length(7)
            expect(list.eq(0), '1 elemento').to.contain('Nombre completo')
            expect(list.eq(1), '2 elemento').to.contain('Email')
            expect(list.eq(2), '3 elemento').to.contain('Fecha de nacimiento')
            expect(list.eq(3), '4 elemento').to.contain('Dni')
            expect(list.eq(4), '5 elemento').to.contain('Dirección')
            expect(list.eq(5), '6 elemento').to.contain('Teléfono')
            expect(list.eq(6), '7 elemento').to.contain('Cbu')
            })        
        });
});