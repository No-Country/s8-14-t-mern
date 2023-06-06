import { Router } from 'express'
import Benefice from '../models/benefice.model'
import User from '../models/users.models'
import { instanceOfError } from '../utils/validations/httpErrorHandler'

const router = Router()
function formatDate(date: Date) {
  return date.toLocaleString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Crear beneficio, para cargar cards en el front
router.post('/create', async (req, res) => {
  try {
    //Midleware:
    if (!req.body.name || !req.body.description || !req.body.category) {
      return res.status(400).json({ msg: 'faltan campos obligatorios' })
    }
    const beneficio = await Benefice.create(req.body)
    // const beneficioEdit = {
    //   name: beneficio.name,
    //   id: beneficio.id,
    //   typeBenefice: beneficio.typeBenefice,
    //   description: beneficio.description,
    //   category: beneficio.category,
    //   startDate: formatDate(beneficio.startDate),
    //   endDate: formatDate(beneficio.endDate),
    //   discountPercentage: `${beneficio.discountPercentage}%`,
    //   cashback: `${beneficio.cashback}%`,
    //   promoCode: beneficio.promoCode
    // }
    res.status(201).json({
      msg: 'Beneficio creado con exito',
      data: beneficio
    })
  } catch (error) {
    instanceOfError(res, error, 400)
  }
})
// Obtener los beneficios disponibles para la aplicacion.
router.get('/all', async (req, res) => {
  const benefices = await Benefice.find({})
  return res.status(200).json({ data: benefices })
})
// filtrar beneficios por categorias
router.get('/category/:categoryName', async (req, res) => {
  const category = req.params.categoryName
  const benefices = await Benefice.find({ category })
  console.log(benefices.length)
  return res.status(200).json({
    msg: `esta categoria tiene ${benefices.length} beneficios`,
    data: benefices
  })
})
// Obtener los detalles de un beneficio específico.
router.get('/:idBenefice', async (req, res) => {
  const id = req.params.idBenefice
  const beneficio = await Benefice.findById(id)
  if (!beneficio) {
    return res.status(404).json({ msg: 'Beneficio no encontrado' })
  }
  return res.status(200).json({ data: beneficio })
})
//TODO: como usuario, activar o desactivar un beneficio para poder usarlo
router.put('/activate', async (req, res) => {
  const { idUser, idBenefice, active } = req.body
  try {
    const userFound = await User.findById(idUser)
    const beneficeFound = await Benefice.findById(idBenefice)
    if (active === true) {
      const beneficio = await Benefice.findById(idBenefice)
      const userUpdate = await User.updateOne(
        { _id: idUser },
        { $addToSet: { benefices: beneficio } }
      )
      return res.status(200).json({
        msg: `Agregaste el benecifico ${beneficeFound?.name}`,
        userUpdate
      })
    }
    if (active === false) {
      const findBenefice = userFound?.benefices.find(
        benef => benef.name === beneficeFound?.name
      )
      if (findBenefice) {
        const userUpdate = await User.updateOne(
          { _id: idUser },
          { $pull: { benefices: beneficeFound } }
        )
        return res.status(200).json({
          msg: `Quitaste el benecifico ${beneficeFound?.name}`,
          userUpdate
        })
      }
      return res
        .status(404)
        .json({ msg: 'No puede eliminar un beneficio que no existe' })
    }
  } catch (error) {
    instanceOfError(res, error, 400)
  }
})
//TODO: MOdificar un beneficio, para equipo front

export { router }
