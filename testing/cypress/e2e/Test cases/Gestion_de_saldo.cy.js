import { loginPage } from "../../pages/loginPage";
import { gestionSaldo } from "../../pages/gestion_de_saldo";

const LocalHostUrl_login = 'http://localhost:3000/auth/login'

describe('Seccion Gestion de Saldos', () => {

    beforeEach(() => {
    
       cy.visit(LocalHostUrl_login)
       loginPage.userLogin(LocalHostUrl_login,'user@mail.com','Abcd1234*') 
    });

    it('Tr_001 | Transferencia Exitosa', () => {
      // Y tengo saldo suficiente para realizar una transferencia
      cy.wait(3000).then(()=>{
        // se valida la exitencia de saldo > $0
        cy.contains('Total disponible').should('be.visible')
        cy.contains('Transferir').click()
        // Cuando ingreso la direccion de la billetera de destino y el monto de la transferencia
        gestionSaldo.inputCBU(28)
        // Y confirmo CBU
        cy.contains('Continuar').click()
        cy.wait(2000)
        // y ingreso monto $100
        gestionSaldo.inputAmount(100)
        cy.contains('Continuar').click()
        // Y selecciono Motivo
        gestionSaldo.inputOption('Sueldo')
        cy.contains('Continuar').click()
        // Y confirmo la transaccion
        cy.contains('Continuar').click()
        // Entonces deberia ver un mensaje de exito indicando que la tranasferencia se ha realizado exitosamente
        cy.wait(2000)
        cy.contains('Tu envío se realizó con éxito').should('be.visible')
        // y realizo clic en volver al home
        cy.contains('Volver').click()
        // Y debería ver un registro con ultimos movimientos -$100 
        gestionSaldo.activityList('100')
        cy.wait(2000)
        // Y mi saldo se ha actualizado de manera correcta, restando el monto transferido (se compara con balance del localStorage)
        gestionSaldo.verifyAmount()
        // Y el destinatario debería recibir la transferencia exitosamente
        // Y el destinatario debería ver un registro de la transacción en su lista de transacciones recientes
      })        

    });

    it.only('Tr_003| Transferencia con Fondos Insuficientes', () => {
      cy.wait(2000).then(()=>{
      // Dado que tengo una cuenta de origen con un saldo de $1000
      cy.contains('Total disponible').should('be.visible')
      cy.contains('Transferir').click()
      // Y tengo una cuenta de destino n° xxxxx
      gestionSaldo.inputCBU(28)  
      // Cuando intento transferir $2000 de la cuenta de origen a la cuenta de destino
      cy.contains('Continuar').click()
      cy.wait(2000)
      gestionSaldo.inputAmount(2000)
      cy.contains('Continuar').click()
      // Y selecciono Motivo
      gestionSaldo.inputOption('Sueldo')
      cy.contains('Continuar').click()
      // Y confirmo la transaccion
      cy.contains('Continuar').click()
      cy.wait(2000)
      cy.contains('Error: Insufficient balance').should('be.visible')
      // Entonces deberia recibir un mensaje de error indicando fondos insuficientes
      // Y el saldo de la cuenta [16] origen no deberia cambiar
      gestionSaldo.userBalance(16)
      // y cancelamos operacion
      cy.contains('Cancelar').click()
      // Y el saldo de la cuenta de destino no deberia cambiar
      cy.wait(2000)
      // y el saldo en total disponible $ "Se valida con saldo total en el localStorage"
      gestionSaldo.verifyAmount()
  
      })
      
    });

    it('Tr| Transferencia con Saldo Negativo', () => {
      cy.wait(2000).then(()=>{
        // Dado que tengo una cuenta de origen con un saldo de $20
        cy.contains('Total disponible').should('be.visible')
        cy.contains('Transferir').click()
        // Y tengo una cuenta de destino n° xxxxx
        // when cuando intento realizar la transferencia
      })
      // Given que tengo una cuenta en la billetera virtual con saldo negativo
      // and deseo transferir una cantidad específica a otra cuenta
      // when cuando intento realizar la transferencia
      // Then debería recibir un mensaje de error indicando que no hay saldo suficiente
      // and la transferencia no debería ser realizada
      // and mi saldo actual debería seguir siendo 0
      // and la cuenta de destino no debería recibir ningún monto

    });

    it('Tr| Transferencia con Saldo 0', () => {
      // Given que tengo una cuenta en la billetera virtual con saldo 0
      // and deseo transferir una cantidad específica a otra cuenta
      // when cuando intento realizar la transferencia
      // Then debería recibir un mensaje de error indicando que no se puede realizar la transferencia debido a saldo negativo
      // and la transferencia no debería ser realizada
      // and mi saldo actual debería seguir siendo negativo
      // and la cuenta de destino no debería recibir ningún monto

    });
    
    it('Tr| Validacion de datos de entrada', () => {
      // Given que estoy en la página de transferencia de fondos
      // when ingreso caracteres no numéricos "$%&" en el campo de monto
      // then debería ver un mensaje de error que indique un monto inválido

    });

    
});