import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRET_KEY || 'pigmeo123'
import dotenv from 'dotenv'
import { UserRequestI } from '../interfaces/user.interface'
import User from '../models/users.models'
import { httpErrorHandler } from '../utils/validations/httpErrorHandler'
dotenv.config()

interface JwtPayloadI {
  email: string
  id: string
  iat: number
  exp: number
}

// decode token
const verifyToken = async (
  req: UserRequestI,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader !== 'null') {
      const token = authHeader.split(' ')[1]
      jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null, decoded) => {
        const payload = decoded as JwtPayloadI
        if (err || new Date() >= new Date(payload.exp * 1000)) {
          return res
            .status(403)
            .send({ success: false, message: 'Token Expired' })
        }

        User.findById(payload.id)
          .select('-password -createdAt -updatedAt')
          .then(user => {
            if (!user) {
              return httpErrorHandler(res, { message: 'User not found' })
            }
            req.user = user
            next()
          })
          .catch(error => {
            httpErrorHandler(res, error)
          })
      })
    } else {
      res.status(403).json({ success: false, message: 'UnAuthorized' })
    }
  } catch (error) {
    res.send({
      message: 'error',
      success: false
    })
  }
}

export { verifyToken }
