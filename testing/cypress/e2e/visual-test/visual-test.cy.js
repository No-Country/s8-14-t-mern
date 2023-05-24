/// <reference types="cypress" />
import { loginPage } from "../../pages/loginPage";

describe('Seccion Home', () => {
    beforeEach(() => {
        cy.eyesOpen({
            appName: 'Pigmeo',
            testName: Cypress.currentTest.title,
        })
        cy.visit('http://localhost:3000')
    })

    it('Visual Testing en Home Page', () => {
        cy.eyesCheckWindow({
            tag: "Home",
            target: 'window',
            fully: true
        });
        
        // cy.get('[href="/auth/login"]').click()
        // loginPage.submitLogin('user@mail.com','Abcd1234*')    
        // loginPage.clickLogin()
        // cy.get('[href="/auth/login"]').click()
        // cy.get('a').click()
        
    })

    afterEach(() => {
        cy.eyesClose() 
    })  
})