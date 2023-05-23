import { type Response } from 'express'
import { ValidationError } from 'express-validator'

export const httpErrorHandler = (
  res: Response,
  error: { message: string | ValidationError[] },
  status = 404
) => {
  res.status(status).send(error.message)
}

export const instanceOfError = (
  res: Response,
  error: unknown,
  code: number
) => {
  if (error instanceof Error)
    httpErrorHandler(res, { message: error.message }, code)
}
