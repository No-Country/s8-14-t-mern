//Generar un password random de 8 digitos
let r = Math.random().toString(36).substr(2,8);
console.log('Pass',r)