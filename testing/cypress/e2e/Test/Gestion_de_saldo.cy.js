describe('Seccion Gestion de Saldos', () => {

    beforeEach(() => {
    cy.section('Dado que he iniciado sesion en mi billetera virtual')
       cy.visit('www.google.com')
    });

    it('Gestion_001 | Transferencia Exitosa', () => {
       cy.section('Y tengo saldo suficiente para realizar una transferencia')
       cy.log('se valida la exitencia de saldo > 0 $')
       cy.section('Cuando ingreso la direccion de la billetera de destino y el monto de la transferencia')
       cy.section('Y confirmo la transferencia')
       cy.section('Entonces deberia ver un mensaje de exito indicando que la tranasferencia se ha realizado exitosamente')
       cy.section('Y mi saldo se ha actualizado de manera correcta, restando el monto trasnferido')
       cy.section('Y debería ver un registro de la transacción en mi lista de transacciones recientes')
       cy.section('Y el destinatario debería recibir la transferencia exitosamente')
       cy.section('Y el destinatario debería ver un registro de la transacción en su lista de transacciones recientes')
    });

    it('Gestion_002 | Agregar Trajeta Virtual', () => {
        
    });
    
});