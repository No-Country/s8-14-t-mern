import { v4 as uuidv4 } from 'uuid'
import { Schema, model } from 'mongoose'
import {
  IUser,
  IdentificationType,
  rolType
} from '../interfaces/user.interface'

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
      enum: Object.values(IdentificationType),
      required: true
    },
    numberIdentification: {
      type: Number,
      required: true,
      unique: true
    },
    alias: {
      type: String,
      unique: true,
      set: function (this: IUser) {
        return `${this.firstName}.${this.lastname}.${this.numberIdentification}`
      }
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    address: {
      type: String,
      required: false
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

const User = model<IUser>('User', userSchema)

export default User
