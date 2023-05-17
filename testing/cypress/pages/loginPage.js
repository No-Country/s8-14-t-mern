class LoginPage {
    elements = {
      usernameInput: () => cy.get('[name="email"]'),
      passwordInput: () => cy.get('[name="password"]'),
      loginBtn: () => cy.get('button').eq(1),
      errorMessage: () => cy.get('h3[data-test="error"]'),
    };
  
    typeUsername(username) {
      this.elements.usernameInput().type(username);
    }
  
    typePassword(password) {
      this.elements.passwordInput().type(password);
    }
  
    clickLogin() {
      this.elements.loginBtn().click({force:true});
    }

    errorMessage(text){
      this.elements.errorMessage().should('have.text', text)
    }
  
    submitLogin(username,password){
      this.elements.usernameInput().type(username);
      this.elements.passwordInput().type(password);
    }
  }
  
  export const loginPage = new LoginPage();
  