import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given("que estoy en el formulario de registro", () => {
  cy.step('paso 1')
});

Then("el campo debe estar vacío", (campo) => {
  cy.step('paso 2')
});