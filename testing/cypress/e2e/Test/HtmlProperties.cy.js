
const localApi = 'http://localhost:9000/api/v1/pigmeo/users'

describe('Html Properties', () => {
    beforeEach(() => {
        
    });

    it('Validacion Datos y Parametros Api Users', () => {

    cy.request(localApi)
      .then((response) => {
        cy.writeFile('cypress/fixtures/users.json', response.body)
         })

    cy.fixture('users').should((users)=>{
        expect(users[0].firstName).to.exist
    })    

     
        
    });
});