class RegisterPage {
    elements = {
      firstNameInput: () => cy.get('[name="firstName"]'),
      lastNameInput: () => cy.get('[name="lastname"]'),
      emailInput: () => cy.get('[name="email"]'),
      passwordInput: () => cy.get('[name="password"]'),
      passwordRepeatInput: () => cy.get('[name="repeatPassword"]'),
      loginBtn: () => cy.get('button').eq(0),
      Message: (message) => cy.assertionCheck(message).should('contain',message)
    };
  
    typeEmail(email) {
      this.elements.emailInput().type(email);
    }
  
    typePassword(password) {
      this.elements.passwordInput().type(password);
    }

    typeRepeatPassword(repeatPassword){
      this.elements.passwordRepeatInput().type(repeatPassword)  
    }

    typeFirstName(name){
      this.elements.firstNameInput().type(name)  
    }

    typeLastName(lastName){
      this.elements.lastNameInput().type(lastName)
    }
  
    clickCreate() {
      this.elements.loginBtn().click();
    }

    sistemMessage(message){
      this.elements.Message(message)
    }
  
    submitRegister(email,firstname,lastname,password,repeatPassword){
      this.elements.firstNameInput().type(firstname)
      this.elements.lastNameInput().type(lastname)
      this.elements.emailInput().type(email);
      this.elements.passwordInput().type(password);
      this.elements.passwordRepeatInput().type(repeatPassword)
    }
  }
  
  export const registerPage = new RegisterPage();