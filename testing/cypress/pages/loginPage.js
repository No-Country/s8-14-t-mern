class LoginPage {
    elements = {
      usernameInput: () => cy.get('[name="email"]'),
      passwordInput: () => cy.get('[name="password"]'),
      loginBtn: () => cy.get('button').eq(0),
    };
  
    typeUsername(username) {
      cy.get('[href="/auth/login"]').click()
      this.elements.usernameInput().type(username);
    }
  
    typePassword(password) {
      cy.get('[href="/auth/login"]').click()
      this.elements.passwordInput().type(password);
    }
  
    clickLogin() {
      this.elements.loginBtn().click();
    }

    
    submitLogin(username,password){
      this.elements.usernameInput().type(username);
      this.elements.passwordInput().type(password);
      this.elements.loginBtn().click({force:true});
    }
  }
  
  export const loginPage = new LoginPage();
  