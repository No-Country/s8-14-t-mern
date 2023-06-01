import { Request } from 'express'
import { Document } from 'mongoose'
import { Benefice } from './benefice.interface'
import { ITopUpCard } from './topUpCardsService.interface'
export enum rolType {
  admin = 'admin',
  user = 'user'
}
export enum IdentificationType {
  DNI = 'dni',
  Cedula = 'cedula',
  Pasaporte = 'pasaporte'
}
export interface IUser extends Document {
  firstName: string
  lastname: string
  alias: string
  avatar: string
  phoneNumber: string
  email: string
  typeIdentification: IdentificationType
  numberIdentification: number
  address: string
  country: string
  city: string
  password: string
  balance: number
  isActive: boolean
  rol: rolType
  token: string
  repeatPassword: string
  benefices: Benefice[]
  topUpCard: ITopUpCard[]
}

export interface UserRequestI extends Request {
  user?: IUser
}
