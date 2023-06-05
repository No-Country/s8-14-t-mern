import { Schema, model } from "mongoose";
import { ICardsOfUser } from "../interfaces/cardsOfUser.interface";


const cardsOfUserSchema = new Schema<ICardsOfUser>(
  {
    balanceCard: {
      type: Number,
      default: 0
    },
    cardOptions: {
      type: Schema.Types.ObjectId,
      ref: 'Card',
      // required: true
    },
    numberCard: {
      type: Number,
      unique: true,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true
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