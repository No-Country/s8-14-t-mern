import { model, Schema } from 'mongoose'
import { CardType, ICard } from '../interfaces/card.interface'

const cardSchema =  new Schema<ICard>({
  numberCard: {
    type: Number,
    required: true
  },
  cardType: {
    type: String,
    enum: Object.values(CardType),
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
})

cardSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Card = model<ICard>('Card', cardSchema)

export default Card