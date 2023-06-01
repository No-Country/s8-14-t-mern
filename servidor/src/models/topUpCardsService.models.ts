import { model, Schema } from 'mongoose'

import { ITopUpCard } from "../interfaces/topUpCardsService.interface"

const topUpCardServiceSchema =  new Schema<ITopUpCard>({
  cardId: {
    type: Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  },
  amount: {
    type: Number,
    required: true,
  },

})

topUpCardServiceSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const topUpCardService = model<ITopUpCard>('Card', topUpCardServiceSchema)

export default topUpCardService