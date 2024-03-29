<<<<<<< HEAD

class LoginPage {

    elements = {
      img: () => cy.get('img'),
      emailInput: () => cy.get('[name="email"]'),
      passwordInput: () => cy.get('[name="password"]'),
      loginBtn: () => cy.get('button').eq(0),
      forgotPassBtn: () => cy.get('a'),
      labelEmail: () => cy.get('label').eq(0),
      labelPassword: () => cy.get('label').eq(1),
      loginPage: (url) => cy.visit(url)
    };
  
    userLogin(url,username,password){
      this.elements.loginPage(url)
      this.elements.emailInput().type(username);
=======
class LoginPage {
    elements = {
      usernameInput: () => cy.get('[name="email"]'),
      passwordInput: () => cy.get('[name="password"]'),
      loginBtn: () => cy.get('button').eq(0),
    };
  
    userLogin(username,password){
      this.elements.usernameInput().type(username);
>>>>>>> develop
      this.elements.passwordInput().type(password);
      this.elements.loginBtn().click()
    }

<<<<<<< HEAD
    submitLogin(username,password){
      this.elements.emailInput().type(username);
      this.elements.passwordInput().type(password);  
    }

    typeUsername(username) {
      this.elements.emailInput().type(username);
=======
    typeUsername(username) {
      this.elements.usernameInput().type(username);
>>>>>>> develop
    }
  
    typePassword(password) {
      this.elements.passwordInput().type(password);
    }
  
    clickLogin() {
      this.elements.loginBtn().click();
    }
<<<<<<< HEAD

=======
>>>>>>> develop
    message(text){
      cy.assertionCheck(text).should('contain',text)
    }

<<<<<<< HEAD
    imgLogin(alt,visible){
      this.elements.img().then((img)=>{
        expect(img).to.have.attr(alt).and.not.empty
      })
      this.elements.img().should(visible)
    }

    labelEmailLogin(text){
      this.elements.labelEmail().should('contain',text)
    }

    labelPasswordLogin(text){
      this.elements.labelPassword().should('contain', text)
    }

    inputEmail(type,name){
      this.elements.emailInput().should('have.attr', type, name)
    }

    inputPassword(type,name){
      this.elements.passwordInput().should('have.attr', type, name)
    }

    buttonLogin(text,type,name){
      this.elements.loginBtn().should('contain', text).and('have.attr', type, name)
    }

    buttonRecovery(text,string,url){
      this.elements.forgotPassBtn().should('contain', text)
      this.elements.forgotPassBtn().each((a)=>{
        const href = a.attr('href');
          expect(href).to.be.a(string).and.not.empty;
          expect(href).to.contain(url);
      })
    }

    redireccionBtnRecovery(localhost){
      this.elements.forgotPassBtn().click().then(()=>{
        cy.url().should('equal',localhost)
      })
=======
    submitLogin(username,password){
      this.elements.usernameInput().type(username);
      this.elements.passwordInput().type(password);  
>>>>>>> develop
    }
  }
  
  export const loginPage = new LoginPage();
<<<<<<< HEAD

=======
  
>>>>>>> develop

