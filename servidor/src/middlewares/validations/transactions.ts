import { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import { isValidObjectId } from 'mongoose'
import { validateResults } from '../../utils/validations/validatorHandler'

export const validatorDepositTrns = [
  body()
    .custom((_value, { req }) => {
      const allowedFields = ['token', 'amount', 'id']
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('Los datos de la transacción contiene campos invalidos'),

  body('token').notEmpty().withMessage('Token requerido'),

  body('amount')
    .trim()
    .notEmpty()
    .withMessage('Monto requerido')
    .bail()
    .isNumeric()
    .withMessage('Monto no válido'),

  body('id')
    .trim()
    .notEmpty()
    .withMessage('Id requerido')
    .bail()
    .isString()
    .withMessage('Id no válido')
    .bail()
    .custom(value => {
      if (!isValidObjectId(value)) {
        throw new Error('Type id no válido')
      }
      return true
    }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validatorTransferFundsTrns = [
  body()
    .custom((_value, { req }) => {
      const allowedFields = [
        'amount',
        'sender',
        'receiver',
        'reference',
        'status'
      ]
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('Los datos de la transacción contiene campos invalidos'),

  body('amount')
    .trim()
    .notEmpty()
    .withMessage('Monto requerido')
    .bail()
    .isNumeric()
    .withMessage('Monto no válido'),

  body('sender')
    .trim()
    .notEmpty()
    .withMessage('Remitente requerido')
    .bail()
    .isString()
    .withMessage('Remitente no válido')
    .bail()
    .custom(value => {
      if (!isValidObjectId(value)) {
        throw new Error('Type id no válido')
      }
      return true
    }),

  body('receiver')
    .trim()
    .notEmpty()
    .withMessage('Receptor requerido')
    .bail()
    .isString()
    .withMessage('Receptor no válido')
    .bail()
    .custom(value => {
      if (!isValidObjectId(value)) {
        throw new Error('Type id no válido')
      }
      return true
    }),

  body('reference')
    .trim()
    .notEmpty()
    .withMessage('Referencia requerida')
    .bail()
    .isString()
    .withMessage('Referencia no válida'),

  body('status')
    .trim()
    .notEmpty()
    .withMessage('estado requerido')
    .bail()
    .isString()
    .withMessage('estado no válido'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validatorVerifyAccountTrns = [
  body()
    .custom((_value, { req }) => {
      const allowedFields = ['alias']
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('La verificacion de cuenta contiene un campo invalido'),

  body('alias')
    .trim()
    .notEmpty()
    .withMessage('Alias requerida')
    .bail()
    .isString()
    .withMessage('Alias no válida'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]
