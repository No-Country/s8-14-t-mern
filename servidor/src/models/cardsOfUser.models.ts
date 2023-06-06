import { model, Schema } from 'mongoose'
import { ICardsOfUser } from '../interfaces/cardsOfUser.interface'

const cardsOfUserSchema = new Schema<ICardsOfUser>(
  {
    balanceCard: {
      type: Number,
      default: 0
    },
    cardOptions: {
      type: Schema.Types.ObjectId,
      ref: 'Card'
    },
    numberCard: {
      type: Number,
      unique: true,
      required: true,
      validate: {
        validator: function (v: number) {
          return v.toString().length >= 12 && v.toString().length <= 16
        },
        message: 'The numberCard must have between 12 and 16 numbers'
      }
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

cardsOfUserSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const CardsOfUser = model<ICardsOfUser>('CardsOfUser', cardsOfUserSchema)

export default CardsOfUser
