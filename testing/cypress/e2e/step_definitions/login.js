import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('abrir web de google',()=>{
    cy.step('probando given')
})

When('paso 2',()=>{
    cy.step('probando when')
})

Then('paso 3',()=>{
    cy.step('probando then')
})