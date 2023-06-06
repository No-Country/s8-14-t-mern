import { Request, Response } from 'express'
import {
  activeBeneficio,
  createBenefice,
  desactiveBeneficio,
  getBeneficeById,
  getBenefices,
  getBeneficesCategory
} from '../services/benefice.services'
import { instanceOfError } from '../utils/validations/httpErrorHandler'

const postBeneficeCtrl = async (req: Request, res: Response) => {
  try {
    const beneficio = await createBenefice(req.body)
    res.status(201).json({
      msg: 'Beneficio creado con exito',
      data: beneficio
    })
  } catch (error) {
    instanceOfError(res, error, 400)
  }
}
const getAllBenefice = async (req: Request, res: Response) => {
  const benefices = await getBenefices()
  return res.status(200).json({ data: benefices })
}
const getBeneficeBycategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.categoryName
    console.log(category)
    const benefices = await getBeneficesCategory(category)
    return res.status(200).json({
      msg: `esta categoria tiene ${benefices.length} beneficios`,
      data: benefices
    })
  } catch (error) {
    instanceOfError(res, error, 400)
  }
}
const getDetailBenefice = async (req: Request, res: Response) => {
  try {
    const id = req.params.idBenefice
    const beneficio = await getBeneficeById(id)

    return res.status(200).json({ data: beneficio })
  } catch (error) {
    instanceOfError(res, error, 400)
  }
}
const activeBenefice = async (req: Request, res: Response) => {
  const { idUser, idBenefice, active } = req.body
  try {
    if (active === true) {
      const userEdit = await activeBeneficio(idUser, idBenefice)
      if (userEdit) {
        return res.status(200).json({
          msg: `Beneficio agregado con exito`
        })
      }
      return res.status(200).json({
        msg: `No se pudo agregar el beneficio`
      })
    }
    if (active === false) {
      const upload = await desactiveBeneficio(idUser, idBenefice)
      return res.status(200).json({
        msg: upload
      })
    }
  } catch (error) {
    instanceOfError(res, error, 400)
  }
}

export {
  activeBenefice,
  getAllBenefice,
  getBeneficeBycategory,
  getDetailBenefice,
  postBeneficeCtrl
}
