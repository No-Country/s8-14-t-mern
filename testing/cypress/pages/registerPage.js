class RegisterPage {
    elements = {
      emailInput: () => cy.get('[name="email"]'),
      nameInput: () => cy.get('[name="name"]'),
      passwordInput: () => cy.get('[name="password"]'),
      passwordRepeatInput: () => cy.get(''),
      loginBtn: () => cy.get('button').eq(1),
      message: () => cy.get('h3[data-test="error"]'),
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

    typeName(name){
      this.elements.nameInput().type(name)  
    }
  
    clickButton() {
      this.elements.loginBtn().click({force:true});
    }

    typemessage(text){
      this.elements.message().type(text)
    }
  
    submitRegister(email,name,password,repeatPassword){
      this.elements.emailInput().type(email);
      this.elements.nameInput().type(name)
      this.elements.passwordInput().type(password);
      this.elements.repeatPassword().type(repeatPassword)
    }
  }
  
  export const RegisterPage = new RegisterPage();