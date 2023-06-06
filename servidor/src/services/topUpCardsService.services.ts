import { ITopUpCard } from '../interfaces/topUpCardsService.interface'
import CardsOfUser from '../models/cardsOfUser.models'
import TopUpCardService from '../models/topUpCardsService.models'
import User from '../models/users.models'

const fetchTopUpCard = async (data: ITopUpCard) => {
  try {
    const { amount, cardOfUserId, userId } = data

    const user = await User.findById(userId)
    if (user?.balance !== undefined) {
      if (user.balance < amount) {
        throw new Error('Insufficient balance')
      }
    }

    const newTopUp = await TopUpCardService.create(data)

    //Decrease the sender's balance
    await User.findByIdAndUpdate(userId, {
      $inc: { balance: -amount }
    })

    //Increase the cardsOfUuser balance
    await CardsOfUser.findByIdAndUpdate(cardOfUserId, {
      $inc: { balanceCard: amount }
    })

    return newTopUp
  } catch (e) {
    throw new Error(e as string)
  }
}

const fetchFindAllTopUpCar = async (id: string) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      throw new Error(`User with id: ${id} does not exist`)
    }

    const topUpCard = await TopUpCardService.find({
      $or: [{ userId: id }, { cardOfUserId: id }]
    })
      .populate(
        'userId',
        '-topUpCard -benefices -cards -avatar -typeIdentification -numberIdentification -token -rol -createdAt -updatedAt -password -isActive'
      )
      .populate('cardOfUserId')

    return topUpCard
  } catch (e) {
    throw new Error(e as string)
  }
}

export { fetchFindAllTopUpCar, fetchTopUpCard }
