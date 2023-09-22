
class TransactionsPage {
    elements = {
        btnTabMenu: (num) => cy.get('button').eq(num),
        elementList: (num) => cy.get('li').eq(num),
        elementsUl: () => cy.get ('ul > li'),
        title: () => cy.get('p'),
        btnBack: () => cy.get('button'),
    }

    back(state){
        this.elements.btnBack().should(state)
    }

    redirectionHome(url){
        this.elements.btnBack().click().then(()=>{
            cy.wait(1000)
            cy.url().should('equal',url)
        })
    }

    title(text,state){
        this.elements.title().should('contain',text).and(state)
    }

    menuBtn(num){
        this.elements.btnTabMenu(num).click()
    }

    listElement(num){
        this.elements.elementList(num).should('not.be.empty')
    }

    dataElementsUl(number,string){
        this.elements.elementsUl().each(($li) => {
            // Obtener el texto del <li>
            cy.wrap($li).invoke('text').then((text) => {
              expect(parseFloat(text)).to.be.a(number);
              expect(text).to.be.a(string);
            });
          })
    }

    elementsUl(state){
        this.elements.elementsUl().should(state)
    }
}

export const transactionsPage = new TransactionsPage();