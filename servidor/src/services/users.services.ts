//TODO: Validaciones
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import User from '../models/users.models'
import { sendMailForgotPassword, sendVerifyMail } from '../utils/handleEmail'
import { encrypt, verifyHash } from '../utils/handlePassword'
import { IUser } from './../interfaces/user.interface'
const secretKey = 'pigmeo123'

//Retorna el usuario encontrado por email recibido.
const findUser = async (email?: string) => {
  try {
    if (email) return await User.findOne({ email })
  } catch (error) {
    throw new Error(`User not Found! - ${error}`)
  }
}

const fetchGet = async () => {
  try {
    const users = await User.find({})
    if (users) {
      return users
    }
  } catch (error) {
    throw new Error('error')
  }
}

const fetchPut = async (user: any) => {
  try {
    // const userMatch = await User.find({ _id: user._id })
    // if (userMatch.length){
    // const firstName =
    //   user.firstName !== '' ? user.firstName : userMatch.firstName
    // const lastname = user.lastname !== '' ? user.lastname : userMatch.lastname
    // const typeIdentification =
    //   user.typeIdentification !== ''
    //     ? user.typeIdentification
    //     : userMatch.typeIdentification
    // const alias = user.alias !== '' ? user.alias : userMatch.alias
    // const phoneNumber =
    //   user.phoneNumber !== '' ? user.phoneNumber : userMatch.phoneNumber
    // const email = user.email !== '' ? user.email : userMatch.email
    // const address = user.address !== '' ? user.address : userMatch.address
    // const avatar = user.avatar !== '' ? user.avatar : userMatch.avatar
    // const password = user.password !== '' ? user.password : userMatch.password
    // const balance = user.balance !== '' ? user.balance : userMatch.balance
    // const isActive = user.isActive !== '' ? user.isActive : userMatch.isActive
    // const rol = user.rol !== '' ? user.rol : userMatch.rol
    // const token = user.token !== '' ? user.token : userMatch.token
    //   const resp = await User.findByIdAndUpdate(
    //     user.id,
    //     {
    //       $set: {
    //         firstName,
    //         lastname,
    //         typeIdentification,
    //         alias,
    //         phoneNumber,
    //         email,
    //         address,
    //         avatar,
    //         password,
    //         balance,
    //         isActive,
    //         rol,
    //         token
    //       }
    //     },
    //     { new: true }
    //   )
    //   return {
    //     error: false,
    //     data: resp
    //   }
    // }
  } catch (error) {
    console.log(error)
    return { data: error }
  }
}

/**
 * Consulta existencia del usuario por id,
 * lo desactiva y guarda los cambios
 */
const fetchDelete = async (user?: IUser) => {
  if (user) {
    user.isActive = false
    return await user.save()
  }
}

/**
 * Hashea la contraseña, registra el usuario.
 * Envia un email para confirmar la cuenta. Retorna mensaje.
 */
const fetchPost = async (user: IUser) => {
  const { password } = user

  const passwordHash = await encrypt(password)
  try {
    const newUser = await User.create({ ...user, password: passwordHash })
    if (newUser === null) throw new Error('Error al registrar el usuario')
    //enviar email para verificacion de cuenta
    await sendVerifyMail(newUser.email, newUser.firstName, newUser.token)

    return {
      msg: 'Usuario creado correctamente. Por favor, verifique su correo para activar su cuenta.'
    }
  } catch (e) {
    throw new Error(e as string)
  }
}

/**
 * Activa el usuario, borra token, guarda los cambios.
 * Pasa req.user a undefined y retorna mensaje
 */
const verifyUserAccount = async (user?: IUser) => {
  try {
    if (user) {
      user.isActive = true
      user.token = ''
      await user.save()
    }
    user = undefined
    return { msg: 'Cuenta de usuario verificado correctamente' }
  } catch (e) {
    throw new Error(e as string)
  }
}

/**
 * Valida la existencia del usuario por email, genera un nuevo token,
 * guarda los cambios. Envia email para realizar el reseteo de psw.
 * Retorna mensaje
 */
const forgotPsw = async (user?: IUser) => {
  try {
    if (user) {
      user.token = uuidv4()
      await user.save()

      await sendMailForgotPassword(user.email, user.firstName, user.token)
      return {
        msg: 'Se ha enviado un correo electrónico para restablecer su contraseña.'
      }
    }
  } catch (e) {
    throw new Error(e as string)
  }
}

/**
 * Recibe el usuario del req.user, la nueva contraseña.
 * Hashea la nueva contraseña, borra el token.
 * Guarda los cambios y envia mensaje.
 */
const newPassword = async (password: string, user?: IUser) => {
  try {
    if (user) {
      user.password = await encrypt(password)
      user.token = ''
      await user.save()
    }
    user = undefined

    return { msg: 'Contraseña actualizada correctamente' }
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const fetchUpdate = async (id: string, data: Partial<IUser>) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      throw new Error(`User with id: ${id} does not exist`)
    }

    Object.assign(user, data)
    const userModified = await user.save()
    return userModified
  } catch (error) {
    throw new Error(error as string)
  }
}

const fetchLogin = async (password: string, email: string) => {
  const user = await findUser(email)

  if (!user) throw new Error('User not found!')

  const comparaPass = await verifyHash(password, user.password)
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
    avatar: user.avatar,
    balance: user.balance,
    token
  }
  return response
}

export {
  fetchDelete,
  fetchGet,
  fetchLogin,
  fetchPost,
  fetchPut,
  fetchUpdate,
  forgotPsw,
  newPassword,
  verifyUserAccount
}
