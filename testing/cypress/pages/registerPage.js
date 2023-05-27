class RegisterPage {
    elements = {
      title: () => cy.get('h1'),
      subTitle: () => cy.get('h6'),
      nameInput: () => cy.get('[name="firstName"]'),
      lastName: () => cy.get('[name="lastname"]'),
      emailInput: () => cy.get('[name="email"]'),
      passwordInput: () => cy.get('[name="password"]'),
      passwordRepeatInput: () => cy.get('[name="repeatPassword"]'),
      loginBtn: () => cy.get('button').eq(0),
    };

    registerTitle(title){
      this.elements.title().should('contain',title)
    }

    registerSubTitle(subtitle){
      this.elements.subTitle().should('contain', subtitle)
    }
  
    typeEmail(email) {
      this.elements.emailInput().type(email);
    }

    attrInputName(type,name){
      this.elements.nameInput().should('have.attr', type, name)
    }

    attrInputLastname(type,name){
      this.elements.lastName().should('have.attr', type, name)
    }

    attrInputEmail(type,name){
      this.elements.emailInput().should('have.attr', type, name)
    }

    attrInputPassword(type,name){
      this.elements.passwordInput().should('have.attr', type, name)
    }

    attrInputRepeatPassword(type,name){
      this.elements.passwordRepeatInput().should('have.attr', type, name)
    }

    attrButtonLogin(type,name,title){
      this.elements.loginBtn().should('have.attr', type, name).and('contain',title)
    }
  
    typePassword(password){
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

    typeMessage(message){
      this.elements.Message(message)
    }
  
    submitRegister(email,name,password,repeatPassword){
      this.elements.emailInput().type(email);
      this.elements.nameInput().type(name)
      this.elements.passwordInput().type(password);
      this.elements.repeatPassword().type(repeatPassword)
    }
  }
  
  export const registerPage = new RegisterPage();