import { profile } from "../pages/profile"

const apiUsuarios = 'http://localhost:9000/api/v1/pigmeo/users'
const datosLocalStorage = JSON.parse(localStorage.getItem('user'));

class HomeElments {
    elements = {
        textoP: () => cy.get('p').eq(0)
    }

    textoSaludo(){
        this.elements.textoP().invoke('text').then((texto)=>{
            const textoParrafo = texto.trim().slice(4,10)
            console.log(textoParrafo)
        })
    }

    dataLocalStorage(){
        let firstName = datosLocalStorage.firstName
        console.log(firstName)  
    }

    saludoHome(){
        let firstName = datosLocalStorage.firstName
    
        this.elements.textoP().invoke('text').then((texto)=>{
            const textoUsuario = texto.trim().slice(5,17) 
            let saludoUser = textoUsuario
        expect(saludoUser).to.contain(firstName)
        })

        // cy.request('GET',apiUsuarios).then((response)=>{
        //     const data = response.body
        //     const nombreLogin = data[16]
        //   expect(nombreLogin.firstName).to.contain(firstName)
        // })
    }
}
    
export const homeElments = new HomeElments()    

    
