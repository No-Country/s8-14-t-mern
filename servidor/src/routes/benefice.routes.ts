import { Router } from 'express'
import Benefice from '../models/benefice.model'
import { instanceOfError } from '../utils/validations/httpErrorHandler'

const router = Router()

function formatDate(date: Date) {
  return date.toLocaleString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric'
    // timeZoneName: 'long'
  })
}

//Todo: Definir funcionalidad de beneficios
/*
1- definir las rutas que estarán asociadas con el sistema de beneficios.
 /beneficios, /beneficios/{usuario}, /beneficios/{usuario}/{idBeneficio},
2- crear un modelo de beneficios para poder interactuar con el usuario y la aplicacion
  - sistema de reintegro:
    * establecer % de reintegro  
    * establecer tope de reintegro    
  - sistema de descuento %
    * establecer descuento
3- validar datos para que esten correctamente formateados

*/
//TODO: Crear un beneficio
router.post('/create', async (req, res) => {
  try {
    //Midleware:
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.discountPercentage ||
      !req.body.category
    ) {
      return res.status(400).json({ msg: 'faltan campos obligatorios' })
    }

    const beneficio = await Benefice.create(req.body)
    const beneficioEdit = {
      name: beneficio.name,
      description: beneficio.description,
      category: beneficio.category,
      startDate: formatDate(beneficio.startDate),
      endDate: formatDate(beneficio.endDate),
      discountPercentage: `${beneficio.discountPercentage}%`,
      cashback: `${beneficio.cashback}%`,
      promoCode: beneficio.promoCode
    }

    res.status(201).json(beneficioEdit)
  } catch (error) {
    console.log(error)
    instanceOfError(res, error, 400)
  }
})
//TODO: Obtener los beneficios disponibles para la aplicacion.
//TODO: filtrar beneficios por categorias
//TODO: Obtener los detalles de un beneficio específico.
//TODO: Activar o desactivar un beneficio.
//TODO: Cambiar el codigo de un beneficio
//TODO: MOdificar un beneficio
//TODO: Canjear un beneficio. => afecta el balance

router.get('/', (req, res) => {
  res.status(200).json('todo ok')
})

export { router }
