import { Request, Response } from 'express'
import { fetchGet, fetchUserId, fetchPut, fetchPost } from '../services/users.services'

const getUserCtrl = async(_req: Request, res: Response) => {
  try {
    const allUser = await fetchGet()
    if(allUser)res.status(200).json(allUser)
    else res.status(404).json({ status: 'not found' })
  } catch (error) {
    res.status(400).json({ error: 'Doesnt exist Users' })
  }
}

const getUserId = async(_req: Request, res: Response) => {
  const { id } = _req.params
  try {
    const userId = await fetchUserId(id)
    res.status(200).json(userId)
  } catch (error) {
    res.status(400).json({ error: 'Doesnt exist user with id ' + id })
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

const postUserCtrl = async (req: Request, res: Response) => {
  try {
    const data = await fetchPost(req.body)
    res.status(201).json({ msg: 'User created succeful', data })
  } catch (error: any) {
    console.log('CONTROLADOR', error)
    res.status(400).json({ error: error.message })
  }
}

export { getUserCtrl, getUserId, putUserCtrl, postUserCtrl }
