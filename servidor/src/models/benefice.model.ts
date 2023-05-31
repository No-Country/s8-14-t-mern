import { Document, model, Schema } from 'mongoose'

interface Benefice extends Document {
  name: string
  category: string
  description: string
  startDate: Date
  endDate: Date
  isActive?: boolean
  discountPercentage?: number
  cashback?: number
  promoCode?: string
  theBest?: boolean
  typeBenefice?: string
}

const beneficeSchema = new Schema<Benefice>({
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
    default: function (this: Benefice) {
      const numeroRandom = Math.floor(Math.random() * 10000)
      return `${this.name}.Pigmeo.${numeroRandom}`
    }
  }
})

beneficeSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const BenefitModel = model<Benefice>('Benefice', beneficeSchema)

export default BenefitModel
