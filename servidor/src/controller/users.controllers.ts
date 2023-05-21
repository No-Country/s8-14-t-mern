import { Request, Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
// import User from '../models/users.models'
// import fs from 'fs-extra'
import config from '../config'
cloudinary.config(config.cloudinary as unknown as any)
// import dataBase from '../utils/database'
import { IUser } from '../interfaces/user.interface'
import {
  fetchDelete,
  fetchGet,
  fetchLogin,
  fetchPost,
  fetchPut,
  fetchUpdate,
  fetchUserId
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

const getUserId = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await fetchUserId(id)
    res.status(200).json(user)
  } catch (error) {
    instanceOfError(res, error, 404)
  }
}

const putUserCtrl = async (req: Request, res: Response) => {
  try {
    const data = await fetchPut(req.body)
    res.status(201).json({ msg: 'user updated', data })
  } catch (error: any) {
    console.log('CONTROLADOR', error)
    res.status(400).json({ error: error.message })
  }
}

const deleteUserCtrl = async ({ params: { id } }: Request, res: Response) => {
  try {
    const data = await fetchDelete(id)
    res.status(200).json({ msg: 'user deleted', data })
  } catch (error) {
    instanceOfError(res, error, 404)
  }
}

const patchUserCtrl = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const { typeIdentification, phoneNumber, email, address, password } =
      req.body

    const data: Partial<IUser> = {}
    if (typeIdentification) data.typeIdentification = typeIdentification
    if (phoneNumber) data.phoneNumber = phoneNumber
    if (email) data.email = email
    if (address) data.address = address
    if (password) data.password = password

    const userModified = await fetchUpdate(id, data)

    res
      .status(200)
      .json({ msg: `User with id: ${id} edited succesfully`, userModified })
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const postUserCtrl = async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.image) {
      const { ...userData } = req.body
      const link =
        'https://res.cloudinary.com/dnautzk6f/image/upload/v1684479601/User-Pigmeo_ucusuy.jpg'
      const data = await fetchPost({ ...userData, avatar: link })
      res.status(201).json({ msg: 'User created succeful', data })
    }
  } catch (error) {
    instanceOfError(res, error, 400)
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body
    const data = await fetchLogin(password, email)
    res.status(201).json({ msg: 'User login succeful', data })
  } catch (error) {
    instanceOfError(res, error, 400)
  }
}

export {
  deleteUserCtrl,
  getUserCtrl,
  getUserId,
  loginUser,
  patchUserCtrl,
  postUserCtrl,
  putUserCtrl
}
