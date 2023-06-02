/**
 * Controlador para manejar las operaciones relacionadas con los usuarios.
 * @group Controller/User
 */
import { Request, Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import config from '../config'
cloudinary.config({ cloudinary: config.cloudinary })
import { IUser, UserRequestI } from '../interfaces/user.interface'
import {
  fetchDelete,
  fetchGet,
  fetchLogin,
  fetchPost,
  fetchPut,
  fetchUpdate,
  forgotPsw,
  newPassword,
  verifyUserAccount
} from '../services/users.services'
import { instanceOfError } from '../utils/validations/httpErrorHandler'

const getUserCtrl = async (_req: Request, res: Response) => {
  try {
    const allUser = await fetchGet()
    if (allUser) res.status(200).json(allUser)
    else res.status(404).json({ status: 'not found' })
  } catch (error) {
    res.status(400).json({ error: 'Doesnt exist Users' })
  }
}

const getUserIdCtrl = ({ user }: UserRequestI, res: Response) => {
  if (user) {
    res.json(user)
    user = undefined
  }
}

const putUserCtrl = async (req: Request, res: Response) => {
  try {
    const data = await fetchPut(req.body)
    res.status(201).json({ msg: 'user updated', data })
  } catch (error) {
    instanceOfError(res, error, 400)
  }
}

/**
 * Toma el req.user que setea el middleware y llama al servicio para procesar
 * SoftDelete del usuario
 * @param user: UserRequestI
 * @param res: Response
 * @return Promise<void>
 */
const deleteUserCtrl = async ({ user }: UserRequestI, res: Response) => {
  try {
    const data = await fetchDelete(user)
    user = undefined
    res.status(200).json({ msg: 'user deleted', data })
  } catch (error) {
    instanceOfError(res, error, 500)
  }
}

const patchUserCtrl = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const {
      firstName,
      lastname,
      typeIdentification,
      phoneNumber,
      email,
      address,
      password,
      numberIdentification,
      country,
      city
    } = req.body

    const data: Partial<IUser> = {}
    if (typeIdentification) data.typeIdentification = typeIdentification
    if (phoneNumber) data.phoneNumber = phoneNumber
    if (email) data.email = email
    if (address) data.address = address
    if (password) data.password = password
    if (numberIdentification) data.numberIdentification = numberIdentification
    if (country) data.country = country
    if (city) data.city = city

    if (firstName || lastname) {
      res.status(400).json({
        msg: "This data can not be edited: 'firstName' and 'lastname' "
      })
      return
    }

    const userModified = await fetchUpdate(id, data)

    res
      .status(200)
      .json({ msg: `User with id: ${id} edited succesfully`, userModified })
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const putImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ error: 'No avatar file provided' })
    }

    const avatarFile = req.files.avatar as any

    const uploadedImage = await cloudinary.uploader.upload(
      avatarFile.tempFilePath,
      {
        folder: 'Pigmeo/users',
        use_filename: true,
        unique_filename: false
      }
    )

    const avatarUrl = uploadedImage.secure_url

    const updatedUser = await fetchUpdate(id, { avatar: avatarUrl })
    res
      .status(200)
      .json({ msg: `User with id: ${id} edited succesfully`, updatedUser })
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const postUserCtrl = async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.avatar) {
      const { ...userData } = req.body
      const link =
        'https://res.cloudinary.com/dnautzk6f/image/upload/v1684479601/User-Pigmeo_ucusuy.jpg'
      const data = await fetchPost({ ...userData, avatar: link })
      res.status(201).json(data)
    }
  } catch (error) {
    instanceOfError(res, error, 400)
  }
}

/**
 * Toma el req.user que setea el middleware y llama al servicio para procesar
 * la validacion de la cuenta del usuario
 * @param user: UserRequestI
 * @param res: Response
 * @return void
 */
const verifyUserCtrl = ({ user }: UserRequestI, res: Response) => {
  verifyUserAccount(user)
    .then(msg => res.status(200).json(msg))
    .catch(error => {
      instanceOfError(res, error, 500)
    })
}

const forgotPasswordCtrl = ({ user }: UserRequestI, res: Response): void => {
  forgotPsw(user)
    .then(msg => res.json(msg))
    .catch(error => {
      instanceOfError(res, error, 500)
    })
}

/**
 * Despues de pasar por el middleware para validar el token del usuario,
 * limpia el req.user y envia msg
 * @param user: UserRequestI
 * @param res: Response
 * @return Response<any, Record<string, any>> | undefined
 */
const verifyTokenPswCtrl = ({ user }: UserRequestI, res: Response) => {
  if (user) {
    user = undefined
    return res.send('Token verificado')
  }
}

const newPswCtrl = (
  { body: { password }, user }: UserRequestI,
  res: Response
) => {
  newPassword(password, user)
    .then(msg => {
      res.json(msg)
    })
    .catch(error => {
      instanceOfError(res, error, 500)
    })
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body
    const data = await fetchLogin(password, email)
    res.status(201).json({ msg: 'User login succeful', data })
  } catch (error) {
    instanceOfError(res, error, 404)
  }
}

export {
  deleteUserCtrl,
  forgotPasswordCtrl,
  getUserCtrl,
  getUserIdCtrl,
  loginUser,
  newPswCtrl,
  patchUserCtrl,
  postUserCtrl,
  putImage,
  putUserCtrl,
  verifyTokenPswCtrl,
  verifyUserCtrl
}
