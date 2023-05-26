Feature: Registro de usuario
  Como usuario de Internet
  Quiero registrarme en un sitio web
  Para poder acceder a sus servicios

  Scenario: Registro exitoso
    Given que estoy en el formulario de registro
    Then el campo debe estar vacío
    And el campo "email" debe estar vacío
    And el campo "contraseña" debe estar vacío
