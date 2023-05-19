import { v4 as uuidv4 } from 'uuid'
import { Schema, model } from 'mongoose'
import {
  IUser,
  IdentificationType,
  rolType
} from '../interfaces/user.interface'

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
    address: {
      type: String
    },
    avatar: {
      type: String,
      required: false
      // default:
      //   'https://res.cloudinary.com/dnautzk6f/image/upload/v1684479601/User-Pigmeo_ucusuy.jpg'
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
      default: true
    },
    rol: {
      type: String,
      enum: Object.values(rolType),
      required: true,
      default: rolType.user
    },
    token: {
      type: String,
      default: uuidv4()
    }
  },
  { timestamps: true }
)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = model<IUser>('User', userSchema)

export default User
