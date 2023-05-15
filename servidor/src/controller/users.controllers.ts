import { Request, Response } from 'express'
import { fetchGet } from '../services/users.services'

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

export { getUserCtrl }
