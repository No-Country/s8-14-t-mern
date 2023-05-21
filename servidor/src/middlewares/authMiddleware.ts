import { Request, Response, NextFunction } from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
//const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'pigmeo123'
import dotenv from 'dotenv'
dotenv.config()

// decode token

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    console.log('HEADER', authHeader)
    if (authHeader && authHeader !== 'null') {
      const token = authHeader.split(' ')[1]
      jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null) => {
        if (err) {
          return res
            .status(403)
            .send({ success: false, message: 'Token Expired' })
        }
        next()
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
