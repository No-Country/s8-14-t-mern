const apiUsuarios = 'http://localhost:9000/api/v1/pigmeo/users'
const datosLocalStorage = JSON.parse(localStorage.getItem('user'));

class GestionSaldo {
    elements = {
        input: () => cy.get('input'),
        amounInput: () => cy.get('[name="amount"]'),
        inputOption: () => cy.get ('div > div > div').eq(2),
        amount: () => cy.get('p').eq(1),
        homeList: () => cy.get('li').eq(0),
    }
   
    inputAmount(num){
        this.elements.amounInput().type(num)
    }

    inputCBU(num){
        cy.request('GET',apiUsuarios).then((response)=>{
            const data = response.body
            const idLogin = data[num].id
            this.elements.input().type(idLogin)
        })
    } 

    inputOption(option){
        this.elements.inputOption().click()
        cy.contains(option).click({force:true})
    }

    verifyAmount(){
        this.elements.amount().invoke('text').then((e)=>{
            const amount = e
            expect(datosLocalStorage.balance).to.eq(amount)
            cy.log(amount)
        })
    }
   
    userBalance(num){
        cy.request('GET',apiUsuarios).then((e)=>{
            const data = e.body[num].balance
                expect(data).to.eq(datosLocalStorage.balance)        
        }) 
    }
    
    activityList(num){
        this.elements.homeList().invoke('text').then((e)=>{
            let list = e.slice(24,27)
            expect(list).to.eq(num)
        })
    }
}

export const gestionSaldo = new GestionSaldo();