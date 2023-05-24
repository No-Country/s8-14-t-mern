Feature: Transferencia de Fondos Billetera Virtual

    se realizaran distintos escenarios de pruebas en la gestion de saldo en la billetera virtual

Background: 
    Given que he iniciado sesion en mi billetera virtual
  Escenario: Transferencia exitosa en una billetera virtual
    When ingreso mi usuario "userName", mi password "user_password" y luego realizo clic en ingresar
    And tengo un saldo suficiente para realizar una transferencia
    When ingreso la dirección de la billetera de destino y el monto de la transferencia
    And selecciono una tasa de transacción apropiada
    And confirmo la transferencia
    Then debería ver un mensaje de éxito indicando que la transferencia se ha realizado exitosamente
    And mi saldo se ha actualizado de manera correcta, restando el monto transferido y la tasa de transacción seleccionada
    And debería ver un registro de la transacción en mi lista de transacciones recientes
    And el destinatario debería recibir la transferencia exitosamente
    And el destinatario debería ver un registro de la transacción en su lista de transacciones recientes
