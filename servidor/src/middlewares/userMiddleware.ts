import { NextFunction, Request, Response } from 'express'
import { UserRequestI } from '../interfaces/user.interface'
import User from '../models/users.models'
import { instanceOfError } from '../utils/validations/httpErrorHandler'

export const checkUserEmail = async (
  req: UserRequestI,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { email }
  } = req
  try {
    const userFound = await User.findOne({ email }).select(
      'firstName email token isActive'
    )
    if (!userFound) throw new Error(`User not found by email: ${email}`)
    req.user = userFound
    next()
  } catch (error) {
    instanceOfError(res, error, 404)
  }
}
