class RegisterPage {
    elements = {
<<<<<<< HEAD
      title: () => cy.get('h1'),
      subTitle: () => cy.get('h6'),
      nameInput: () => cy.get('[name="firstName"]'),
      lastName: () => cy.get('[name="lastname"]'),
      emailInput: () => cy.get('[name="email"]'),
      passwordInput: () => cy.get('[name="password"]'),
      repeatPassword: () => cy.get('[name="repeatPassword"]'),
      loginBtn: () => cy.get('button').eq(0),
    };

    registerTitle(title){
      this.elements.title().should('contain',title)
    }

    registerSubTitle(subtitle){
      this.elements.subTitle().should('contain', subtitle)
    }
=======
      firstNameInput: () => cy.get('[name="firstName"]'),
      lastNameInput: () => cy.get('[name="lastname"]'),
      emailInput: () => cy.get('[name="email"]'),
      passwordInput: () => cy.get('[name="password"]'),
      passwordRepeatInput: () => cy.get('[name="repeatPassword"]'),
      loginBtn: () => cy.get('button').eq(0),
      Message: (message) => cy.assertionCheck(message).should('contain',message)
    };
>>>>>>> develop
  
    typeEmail(email) {
      this.elements.emailInput().type(email);
    }
<<<<<<< HEAD

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
=======
  
    typePassword(password) {
>>>>>>> develop
      this.elements.passwordInput().type(password);
    }

    typeRepeatPassword(repeatPassword){
      this.elements.passwordRepeatInput().type(repeatPassword)  
    }

<<<<<<< HEAD
    typeName(name){
      this.elements.nameInput().type(name)  
    }
  
    clickLogin() {
      this.elements.loginBtn().click();
    }

    typeMessage(message){
      this.elements.Message(message)
    }
  
    submitRegister(firstName,lastName,email,password,repeatPassword){
      this.elements.nameInput().type(firstName)
      this.elements.lastName().type(lastName)
      this.elements.emailInput().type(email);
      this.elements.passwordInput().type(password);
      this.elements.repeatPassword().type(repeatPassword)
=======
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
>>>>>>> develop
    }
  }
  
  export const registerPage = new RegisterPage();