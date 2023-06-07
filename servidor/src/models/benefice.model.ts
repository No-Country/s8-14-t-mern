import { model, Schema } from 'mongoose'
import { IBenefice } from '../interfaces/benefice.interface'

const beneficeSchema = new Schema<IBenefice>({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true
  },
  typeBenefice: {
    type: String,
    required: true,
    enum: ['descuentos', 'reintegros']
  },
  theBest: { type: Boolean, default: false },
  description: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  isActive: { type: Boolean, default: true },
  discountPercentage: { type: Number, default: 0 },
  cashback: { type: Number, default: 0 },
  promoCode: {
    type: String,
    default: function (this: IBenefice) {
      const numeroRandom = Math.floor(Math.random() * 10000)
      return `${this.name}.Pigmeo.${numeroRandom}`
    }
  },
  image_1: { type: String },
  image_2: { type: String },
  image_3: { type: String }
})

beneficeSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const BenefitModel = model<IBenefice>('Benefice', beneficeSchema)

export default BenefitModel
