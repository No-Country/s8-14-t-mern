describe('Seccion Gestion de Saldos', () => {

    beforeEach(() => {
    cy.section('Dado que he iniciado sesion en mi billetera virtual')
       cy.visit('/')
    });

    it('Transferencia_001 | Transferencia Exitosa', () => {
      // Y tengo saldo suficiente para realizar una transferencia
      // se valida la exitencia de saldo > $0
      // Cuando ingreso la direccion de la billetera de destino y el monto de la transferencia
      // Y confirmo la transferencia
      // Entonces deberia ver un mensaje de exito indicando que la tranasferencia se ha realizado exitosamente
      // Y mi saldo se ha actualizado de manera correcta, restando el monto trasnferido
      // Y debería ver un registro de la transacción en mi lista de transacciones recientes
      // Y el destinatario debería recibir la transferencia exitosamente
      // Y el destinatario debería ver un registro de la transacción en su lista de transacciones recientes

    });

    it('Transferencia_002 | Transferencia con Fondos Insuficientes', () => {
      // Dado que tengo una cuenta de origen con un saldo de $100
      // Y tengo una cuenta de destino con un saldo de $50
      // Cuando intento trasnferir $200 de la cuenta de origen a la cuenta de destino
      // Entonces deberia recibir un mensaje de error indicando fondos insuficientes
      // Y el saldo de la cuenta origen no deberia cambiar
      // Y el saldo de la cuenta de destino no deberia cambiar
    });

    
    
});