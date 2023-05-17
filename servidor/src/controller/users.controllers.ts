import { Request, Response } from 'express'
import { fetchGet, fetchPut, fetchPost } from '../services/users.services'

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

const putUserCtrl = async( req: Request, res: Response) => {
  try {
    const data = await fetchPut(req.body)
    res.status(200).json({ msg: 'user updated', data })
  } catch (error: any) {
    console.log("CONTROLADOR", error)
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

export { getUserCtrl, putUserCtrl, postUserCtrl }
