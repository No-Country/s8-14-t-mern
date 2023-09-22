
const LocalHostUrl = 'http://localhost:3000/'
const LocalHostUrl_Home = 'http://localhost:3000/home'

describe('Seccion Gestion de Saldos', () => {

    beforeEach(() => {
    cy.section('Dado que he iniciado sesion en mi billetera virtual')
       cy.visit(LocalHostUrl)
    });

    it('Gestion_005 | Visualizacion de Saldo', () => {
        
    });

    it('Gestion_001 | Transferencia Exitosa', () => {
    // Y tengo saldo suficiente para realizar una transferencia
    // se valida la exitencia de saldo > 0 $
    // Cuando ingreso la direccion de la billetera de destino y el monto de la transferencia
    // Y confirmo la transferencia
    // Entonces deberia ver un mensaje de exito indicando que la tranasferencia se ha realizado exitosamente
    // Y mi saldo se ha actualizado de manera correcta, restando el monto trasnferido
    // Y debería ver un registro de la transacción en mi lista de transacciones recientes
    // Y el destinatario debería recibir la transferencia exitosamente
    // Y el destinatario debería ver un registro de la transacción en su lista de transacciones recientes
    });

    it('Gestion_002 | Transferencia con saldo insuficiente', () => {
        
    });

    it('Gestion_003 | Transferencia con saldo 0', () => {
        
    });

    it('Gestion_004 | Transferencia con saldo Negativo', () => {
        
    });
    
});