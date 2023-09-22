const apiUsuarios = 'http://localhost:9000/api/v1/pigmeo/users'
const datosLocalStorage = JSON.parse(localStorage.getItem('user'));

class Profile {
    elments = {
        nombre: () => cy.get('p').eq(1), 
        btnProfile: (num) => cy.get('p').eq(num)
    }

    textoNombre(){
        this.elments.nombre().invoke('text').then((texto)=>{
            const textoUsuario = texto.trim()  
        })  
    }

    btnTab(num){
        this.elments.btnProfile(num).click
    }

    dataUsers(){
    let firstaname = datosLocalStorage.firstName
        this.elments.nombre().invoke('text').then((texto)=>{
            const textoUsuario = texto.trim() 
            let nombreUsuario = textoUsuario
        expect(nombreUsuario).to.be.equal(firstaname)
        })
    }
}

export const profile = new Profile()