import { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import { UserRequestI } from '../../interfaces/user.interface'
import User from '../../models/users.models'
import { instanceOfError } from '../../utils/validations/httpErrorHandler'
import { validateResults } from '../../utils/validations/validatorHandler'

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  /*
	Todo: 
	Obtener el id del usuario y rol a traves del middleware auth 
	Comprobar que el id del usario logueado sea el mismo que el parametro del usuario que quiere consultar
	Comprobar el rol del usuario admin-user
	*/
  //   const { id: userId } = req.params
  //   httpErrorHandler(res, { message: 'Server error' }, 500)
  next()
}

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
    instanceOfError(res, error, 401)
  }
}
