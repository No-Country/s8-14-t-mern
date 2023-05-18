import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('paso 1',()=>{
    cy.step('n1')
})

When('paso 2',()=>{
    cy.step('n2')
})

Then('paso 3',()=>{
    cy.step('n3')
})