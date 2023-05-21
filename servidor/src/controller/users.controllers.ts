import { Request, Response } from 'express'
import {
  fetchDelete,
  fetchGet,
  fetchLogin,
  fetchPost,
  fetchPut,
  fetchUserId
} from '../services/users.services'
import {
  httpErrorHandler,
  instanceOfError
} from '../utils/validations/httpErrorHandler'

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

const postUserCtrl = async (req: Request, res: Response) => {
  try {
    const data = await fetchPost(req.body)
    res.status(201).json({ msg: 'User created succeful', data })
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body
    const data = await fetchLogin(password, email)
    res.status(201).json({ msg: 'User login succeful', data })
  } catch (error) {
    if (error instanceof Error)
      httpErrorHandler(res, { message: error.message }, 400)
  }
}

export {
  deleteUserCtrl,
  getUserCtrl,
  getUserId,
  loginUser,
  postUserCtrl,
  putUserCtrl
}
