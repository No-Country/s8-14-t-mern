import { model, Schema } from 'mongoose'
import { ITopUpCard } from '../interfaces/topUpCardsService.interface'

const topUpCardServiceSchema = new Schema<ITopUpCard>(
  {
    cardOfUserId: {
      type: Schema.Types.ObjectId,
      ref: 'CardsOfUser',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

topUpCardServiceSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const TopUpCardService = model<ITopUpCard>(
  'TopUpCardService',
  topUpCardServiceSchema
)

export default TopUpCardService
