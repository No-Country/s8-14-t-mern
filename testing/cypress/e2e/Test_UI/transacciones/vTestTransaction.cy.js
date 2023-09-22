import { loginPage } from "../../../pages/loginPage"; 
import { transactionsPage } from "../../../pages/transactionPage";

const LocalHostUrl_transactions = 'http://localhost:3000/transactions'
const LocalHostUrl_login = 'http://localhost:3000/auth/login'
const LocalHostUrl_Home = 'http://localhost:3000/home'

describe('Testing elmentos UI | Page Transactions', () => {
    beforeEach(() => {
        loginPage.userLogin(LocalHostUrl_login,'user@mail.com','Abcd1234*')
    });

    it('Elemento titulo en header', () => {
    // Ingresamos seccion transactions
        transactionsPage.menuBtn(1)
    // Validamos el Titulo "Movimientos"    
        transactionsPage.title('Movimientos','be.visible')
    });

    it('Elemento button back', () => {
    // Ingresamos seccion transactions
        transactionsPage.menuBtn(1)   
    // Validamos el button back home
        transactionsPage.back('be.visible')    
    });

    it('Validacion redireccion del button back', () => {
    // Ingresamos seccion transactions
        transactionsPage.menuBtn(1)   
    // Validamos redireccion del button
        transactionsPage.redirectionHome(LocalHostUrl_Home)
        
    });

    it('Validacion de datos y contenido en lista de Movimientos', () => {
    // Ingresamos seccion transactions
        transactionsPage.menuBtn(1)
    //  Validamos que la lista tenga contenido   
        transactionsPage.elementsUl('not.be.empty')
    //  Validamos los tipos de datos en la lista sean String y Number  
        transactionsPage.dataElementsUl('number','string')
    });

});