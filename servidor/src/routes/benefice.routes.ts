import { Router } from 'express'
import {
  activeBenefice,
  getAllBenefice,
  getBeneficeBycategory,
  getDetailBenefice,
  postBeneficeCtrl
} from '../controller/benefice.controllers'

const router = Router()

// Crear beneficio, para cargar cards en el front
router.post('/create', postBeneficeCtrl)
//obtener todos los beneficios
router.get('/all', getAllBenefice)
// filtrar beneficios por categorias
router.get('/category/:categoryName', getBeneficeBycategory)
// Obtener los detalles de un beneficio específico.
router.get('/:idBenefice', getDetailBenefice)
//activar un beneficio para poder usarlo
router.put('/activate', activeBenefice)

export { router }
