
class FetchApis {

    elements = {
        
    }
    
    jsonGenerate(localApi){
        cy.request(localApi)
        .then((response) => {
            cy.writeFile('cypress/fixtures/users.json', response.body)
        })
        cy.fixture('users').should((users)=>{
            expect(users[0].firstName).to.exist
        })   
    }   
    
}

export const fetchApis = new FetchApis();