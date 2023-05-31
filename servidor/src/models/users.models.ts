import { model, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import {
  IdentificationType,
  IUser,
  rolType
} from '../interfaces/user.interface'
// import { Benefice } from '../interfaces/benefice.interface'

//TODO: modificar el campo requerido para que solo sea nombre, apellido, email y contraseña
//TODO: agregar datos para modificar perfil acorde al figma
const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    typeIdentification: {
      type: String,
      enum: Object.values(IdentificationType)
    },
    numberIdentification: {
      type: Number,
      unique: false
    },
    alias: {
      type: String,
      unique: true,
      default: function (this: IUser) {
        return `${this.firstName}.${this.lastname}.${this.email.slice(0, 5)}`
      }
    },
    phoneNumber: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    country: {
      type: String
    },
    city: {
      type: String
    },
    address: {
      type: String
    },
    avatar: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true
    },
    balance: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: false
    },
    rol: {
      type: String,
      enum: Object.values(rolType),
      default: rolType.user
    },
    token: {
      type: String,
      default: uuidv4()
    },
    benefices: { type: [] },
    topUpCard: { type: [] }
  },
  { timestamps: true }
)

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = model<IUser>('User', userSchema)

export default User
