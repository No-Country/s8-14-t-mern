import { isConstructorDeclaration } from "typescript";

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
            const idLogin = data[num].alias
            this.elements.input().type(idLogin)
            console.log(idLogin)
        })
    } 

    inputOption(option){
        this.elements.inputOption().click()
        cy.contains(option).click({force:true})
    }

    verifyAmount(){
       this.elements.amount().should('be.visible')
    }
   
    userBalance(num){
        let td;
        this.elements.amount().invoke('text').then((e)=>{
            let total = e.slice(2,20)
            td = total
            console.log(td)
        })
        cy.request('GET',apiUsuarios).then((e)=>{
            const data = e.body[num].balance
            const newData = data - "-100" 
                expect(newData).to.contain(td) 
                console.log(newData)       
        }) 
    }
    
    activityList(){
        this.elements.homeList().invoke('text').then((e)=>{
            let list = e.slice(24,35)
            expect(list).to.eq(datosLocalStorage.balance)
        })
    }
}

export const gestionSaldo = new GestionSaldo();