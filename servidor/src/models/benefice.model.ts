import { Document, model, Schema } from 'mongoose'

interface Benefice extends Document {
  name: string
  category: string
  description: string
  startDate: Date
  endDate: Date
  isActive: boolean
  discountPercentage?: number
  cashback?: number
  promoCode?: string
}

const beneficeSchema = new Schema<Benefice>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  discountPercentage: { type: Number },
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
