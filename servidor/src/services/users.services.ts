//TODO: Validaciones
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { ICardsOfUser } from '../interfaces/cardsOfUser.interface'
import CardsOfUser from '../models/cardsOfUser.models'
import User from '../models/users.models'
import { sendMailForgotPassword } from '../utils/handleEmail'
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
    return users
  } catch (error) {
    throw new Error('error')
  }
}

/**
 * Consulta existencia del usuario por id,
 * lo desactiva y guarda los cambios
 */
const fetchDelete = async (user?: IUser) => {
  if (user) {
    user.isActive = false
    return await user.deleteOne()
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
    verifyUserAccount(newUser)
    return {
      msg: 'Usuario creado correctamente.',
      newUser
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

  if (!user || !user.isActive) throw new Error('User not found!')

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

/* ----------CARDS OF USER---------- */

const fetchAddCard = async (
  cardData: ICardsOfUser,
  id: string,
  _userData: Partial<IUser>
) => {
  try {
    const newCard = await CardsOfUser.create(cardData)

    //Update the user pushing newCard on user.cards
    const user = await User.findById(id)
    if (!user) {
      throw new Error(`User with id: ${id} does not exist`)
    }

    user.cards.push(newCard)
    const userModified = await user.save()
    return userModified
  } catch (error) {
    throw new Error(error as string)
  }
}

//This does not works
const fetchGetCards = async (id: string) => {
  try {
    const userCard = await CardsOfUser.findById(id)
    return userCard
  } catch (error) {
    throw new Error(error as string)
  }
}

export {
  fetchAddCard,
  fetchDelete,
  fetchGet,
  fetchGetCards,
  fetchLogin,
  fetchPost,
  fetchUpdate,
  forgotPsw,
  newPassword,
  verifyUserAccount
}
