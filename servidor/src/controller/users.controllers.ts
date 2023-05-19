import { Request, Response } from 'express'
import { fetchGet, fetchPost } from '../services/users.services'
import User from '../models/users.models'
import fs from 'fs-extra'
import config from '../config'

import { v2 as cloudinary } from 'cloudinary'
import dataBase from '../utils/database'
cloudinary.config(config.cloudinary as unknown as any)


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
    
    if(!req.files || !req.files.image) {
      const {...userData} = req.body
      const link = 'https://res.cloudinary.com/dnautzk6f/image/upload/v1684479601/User-Pigmeo_ucusuy.jpg' 
      const data = await fetchPost({...userData, avatar:link})
      res.status(201).json({ msg: 'User created succeful', data })
    } 
    
  } catch (error: any) {
    console.log('CONTROLADOR', error)
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

  export { getUserCtrl, postUserCtrl }
