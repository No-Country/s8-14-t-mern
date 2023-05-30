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

    it('Transferencia_003 | Transferencia con Saldo Negativo', () => {
      // Given que tengo una cuenta en la billetera virtual con saldo negativo
      // and deseo transferir una cantidad específica a otra cuenta
      // when cuando intento realizar la transferencia
      // Then debería recibir un mensaje de error indicando que no hay saldo suficiente
      // and la transferencia no debería ser realizada
      // and mi saldo actual debería seguir siendo 0
      // and la cuenta de destino no debería recibir ningún monto

    });

    it('Transferencia_004 | Transferencia con Saldo 0', () => {
      // Given que tengo una cuenta en la billetera virtual con saldo 0
      // and deseo transferir una cantidad específica a otra cuenta
      // when cuando intento realizar la transferencia
      // Then debería recibir un mensaje de error indicando que no se puede realizar la transferencia debido a saldo negativo
      // and la transferencia no debería ser realizada
      // and mi saldo actual debería seguir siendo negativo
      // and la cuenta de destino no debería recibir ningún monto

    });
    
    it('Transferencia_005 | Validacion de datos de entrada', () => {
      // Given que estoy en la página de transferencia de fondos
      // when ingreso caracteres no numéricos "$%&" en el campo de monto
      // then debería ver un mensaje de error que indique un monto inválido

    });

    it('Transferencia_006 | Visualizacion de saldo en billetera virtual', () => {
      // Given que estoy en la página de transferencia de fondos
      // when ingreso caracteres no numéricos "$%&" en el campo de monto
      // then debería ver un mensaje de error que indique un monto inválido

    });
    
});