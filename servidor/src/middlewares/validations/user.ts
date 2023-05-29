import { NextFunction, Request, Response } from 'express'
import { body, param } from 'express-validator'
import { rolType, UserRequestI } from '../../interfaces/user.interface'
import User from '../../models/users.models'
import { instanceOfError } from '../../utils/validations/httpErrorHandler'
import { validateResults } from '../../utils/validations/validatorHandler'

export const validatorRegister = [
  body()
    .custom((_value, { req }) => {
      const allowedFields = [
        'firstName',
        'lastname',
        'email',
        'password',
        'repeatPassword'
      ]
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('Nombre requerido')
    .bail()
    .isString()
    .withMessage('Nombre no válida'),

  body('lastname')
    .trim()
    .notEmpty()
    .withMessage('Apellido requerido')
    .bail()
    .isString()
    .withMessage('Apellido no válida'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email requerido')
    .bail()
    .isEmail()
    .withMessage('Email no válido'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password requerida')
    .bail()
    .isStrongPassword()
    .withMessage(
      'Password debe tener entre minimo 8 caracteres, una mayuscula, una minuscula y un simbolo'
    ),

  body('repeatPassword')
    .trim()
    .notEmpty()
    .withMessage('RepeatPassword requerida')
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden')
      }
      return true
    }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validatorLogin = [
  body()
    .custom((_value, { req }) => {
      const allowedFields = ['email', 'password']
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email requerido')
    .bail()
    .isEmail()
    .withMessage('Email no válido'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password requerida')
    .bail()
    .isString()
    .withMessage('Tipo de dato no valido')
    .isLength({ min: 5, max: 100 })
    .withMessage('Password debe tener entre 5 y 100 caracteres'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validatorTokenAccount = async (
  req: UserRequestI,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params
  try {
    if (!token) {
      throw new Error('Token no proporcionado')
    }

    const user = await User.findOne({ token })

    if (!user) {
      throw new Error('Token inválido - No se ha encontrado el usuario')
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error)
    instanceOfError(res, error, 401)
  }
}

export const validatorUserId = (
  { params: { id: userId }, user }: UserRequestI,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUserId = user?.id
  const authenticatedUserRole = user?.rol
  console.log('validatorUserId', authenticatedUserId, authenticatedUserRole)
  try {
    if (
      userId !== authenticatedUserId ||
      authenticatedUserRole === rolType.admin
    )
      throw new Error('No tienes permiso para acceder a este recurso.')
    next()
  } catch (error) {
    instanceOfError(res, error, 403)
  }
}
