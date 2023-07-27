import { expect, type Locator, type Page } from "@playwright/test";

export class DataUsers {
    email: string
    password: string
    nombre: string
    alias: string
    nacimiento: string
    dni: number
    direccion: string
    telefono: string

    constructor(email: string, password: string, nombre: string){
        this.email = email
        this.password = password
        this.nombre = nombre
    } 
}

export const userK = new DataUsers('userK@mail.com','Abcd1234*','NombreKApellidoK')
export const userM = new DataUsers('userM@mail.com','Abcd1234*','NombreMApellidoM')
 
