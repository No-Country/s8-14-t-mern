class RegisterPage {
    elements = {
      emailInput: () => cy.get('[name="email"]'),
      nameInput: () => cy.get('[name="name"]'),
      passwordInput: () => cy.get('[name="password"]'),
      passwordRepeatInput: () => cy.get(''),
      loginBtn: () => cy.get('button').eq(1),
      errorMessage: () => cy.get('h3[data-test="error"]'),
    };
  
    typeUsername(email) {
      this.elements.emailInput().type(email);
    }
  
    typePassword(password) {
      this.elements.passwordInput().type(password);
    }

    typeRepeatPassword(repeatPassword){
      this.elements.passwordRepeatInput().type(repeatPassword)  
    }

    typeName(name){
      this.elements.nameInput().type(name)  
    }
  
    clickLogin() {
      this.elements.loginBtn().click();
    }
  
    submitRegister(email,name,password,repeatPassword){
      this.elements.emailInput().type(email);
      this.elements.nameInput().type(name)
      this.elements.passwordInput().type(password);
      this.elements.repeatPassword().type(repeatPassword)
      this.elements.loginBtn().click({force:true});
    }
  }
  
  export const RegisterPage = new RegisterPage();