//TODO: Validaciones
import { IUser } from '../interfaces/user.interface'
import User from '../models/users.models'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY || 'pigmeo123'

const fetchGet = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 3000)
  })
}

const fetchPost = async (user: IUser) => {
  const { repeatPassword, firstName, lastname, email } = user
  let { password } = user

  if (password !== repeatPassword) {
    return 'password not match'
  }

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)
  password = passwordHash
  try {
    const newUser = await User.create({ password, firstName, lastname, email })
    console.log(newUser)
    return newUser
  } catch (e) {
    throw new Error(e as string)
  }
}

const fetchLogin = async (password: string, email: string) => {
  try {
    if (!email || !password) {
      throw new Error('mandatory data are missing')
    }
    const user = await User.findOne({ email })

    if (!user) {
      return 'user not found'
    }

    const comparaPass = await bcrypt.compare(password, user.password)
    if (!comparaPass) {
      throw new Error('invalid email or password')
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id
      },
      secretKey,
      {
        expiresIn: '1d'
      }
    )
    const response = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastname,
      alias: user.alias,
      token
    }
    return response
  } catch (error) {
    throw new Error(error as string)
  }
}

export { fetchGet, fetchPost, fetchLogin }
