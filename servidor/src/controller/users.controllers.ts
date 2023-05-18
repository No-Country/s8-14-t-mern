import { Request, Response } from 'express'
import { fetchGet, fetchLogin, fetchPost } from '../services/users.services'

const getUserCtrl = (_req: Request, res: Response) => {
  fetchGet()
    .then(_resp => {
      console.log(_resp)
      res.status(200).json({ msg: 'users' })
    })
    .catch(error => {
      console.log(error)
    })
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
    if (error instanceof Error) res.status(400).json({ error: error })
  }
}

export { getUserCtrl, postUserCtrl, loginUser }
