// importar interface y modelo
import { IBenefice } from '../interfaces/benefice.interface'
import Benefice from '../models/benefice.model'
import User from '../models/users.models'

function formatDate(date: Date) {
  return date.toLocaleString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
const findUserId = async (idUser: string) => {
  return await User.findById(idUser)
}

export const createBenefice = async (benefice: IBenefice) => {
  const beneficio = await Benefice.create(benefice)
  const beneficioEdit = {
    name: beneficio.name,
    id: beneficio.id,
    typeBenefice: beneficio.typeBenefice,
    description: beneficio.description,
    category: beneficio.category,
    startDate: formatDate(beneficio.startDate),
    endDate: formatDate(beneficio.endDate),
    discountPercentage: beneficio.discountPercentage,
    cashback: beneficio.cashback,
    promoCode: beneficio.promoCode,
    image_1: beneficio.image_1,
    image_2: beneficio.image_2,
    image_3: beneficio.image_3
  }
  return beneficioEdit
}

export const getBenefices = async () => {
  return await Benefice.find({})
}
export const getBeneficesCategory = async (category: string) => {
  return await Benefice.find({ category })
}
export const getBeneficeById = async (id: string) => {
  const beneficio = await Benefice.findById(id)
  if (beneficio) {
    const beneficioEdit = {
      name: beneficio.name,
      id: beneficio.id,
      typeBenefice: beneficio.typeBenefice,
      description: beneficio.description,
      category: beneficio.category,
      startDate: formatDate(beneficio.startDate),
      endDate: formatDate(beneficio.endDate),
      discountPercentage: beneficio.discountPercentage,
      cashback: beneficio.cashback,
      promoCode: beneficio.promoCode,
      image_1: beneficio.image_1,
      image_2: beneficio.image_2,
      image_3: beneficio.image_3
    }
    return beneficioEdit
  }
  return 'no se encontro el beneficio'
}

export const activeBeneficio = async (idUser: string, idBenefice: string) => {
  const beneficio = await Benefice.findById(idBenefice)
  const upload = await User.updateOne(
    { _id: idUser },
    { $addToSet: { benefices: beneficio } }
  )
  return upload.modifiedCount !== 0
}

export const desactiveBeneficio = async (
  idUser: string,
  idBenefice: string
) => {
  const userFound = await findUserId(idUser)
  const beneficeFound = await Benefice.findById(idBenefice)

  const findBenefice = userFound?.benefices.find(
    benef => benef.name === beneficeFound?.name
  )
  if (findBenefice) {
    await User.updateOne(
      { _id: idUser },
      { $pull: { benefices: beneficeFound } }
    )
    return 'Beneficio eliminado con exito'
  }
  return 'No puede eliminar un beneficio que no existe'
}
