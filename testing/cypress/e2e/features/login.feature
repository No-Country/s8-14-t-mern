Feature: Inicio de sesión
  Como usuario registrado
  Quiero iniciar sesión en el sitio web
  Para poder acceder a mi cuenta

  Background:  
  Given que estoy en la página de inicio de sesión 
  Scenario: Inicio de sesión exitoso
    When ingreso mi correo electrónico y contraseña
    Then se me redirige a la página de inicio
    And se muestra mi nombre de usuario en la pantalla
  Scenario: Inicio de sesión fallido
    When ingreso un correo electrónico y/o contraseña incorrectos
    Then se muestra un mensaje de error en la pantalla


