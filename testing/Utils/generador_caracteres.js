
class CaracterGenerate {

    generarCaracter(veces) {
        let resultado = ""
        // Genera un número aleatorio entre 0 y 25
        const numAleatorio = Math.floor(Math.random() * 26);
      
        // Convierte el número aleatorio en un caracter usando el código ASCII
        const caracter = String.fromCharCode(97 + numAleatorio); // 'a' es el código ASCII 97
        for (let i = 0; i < veces; i++) {
              resultado[i]
        }

        return resultado;
      }
    
    // multi(veces) {
    
    //     let resultado = "";
      
    //     for (let i = 0; i < veces; i++) {
    //       resultado += caractergen;
    //     }
      
    //     return resultado;
    //   }  
}

export default CaracterGenerate