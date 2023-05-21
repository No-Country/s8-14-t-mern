import { NextFunction, Request, Response } from 'express'
import { httpErrorHandler } from '../../utils/validations/httpErrorHandler'

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
