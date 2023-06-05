import { Request, Response } from "express"
import { fetchFindAllTopUpCar, fetchTopUpCard } from "../services/topUpCardsService.services"


const postTopUpCardCtrl = async (req: Request, res: Response) => {
  try {
    const {...topUpCardData} = req.body

    if(!{...topUpCardData}) {
      return 'Data not provided'
    }
    const newTopUpCard = await fetchTopUpCard({...topUpCardData})
    
    res.status(200).json(newTopUpCard)
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const getAllTopUpCardCtrl = async (req: Request, res: Response) => {
  try {
    const id = req.params.id 

    const getAllTopUpCard = await fetchFindAllTopUpCar(id)

    res.status(200).json(getAllTopUpCard)
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

export {
  postTopUpCardCtrl,
  getAllTopUpCardCtrl
}