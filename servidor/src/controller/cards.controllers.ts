import { Request, Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import config from '../config'
import { fetchGet, fetchPost, findCardType } from '../services/cards.services'
cloudinary.config({ cloudinary: config.cloudinary})


const postCardCtrl = async (req: Request, res: Response) => {
  try {
    const {...cardData} = req.body

    if(!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image file provided'})
    }

    const imageCardFile = req.files.image as any

    const uploadedImage = await cloudinary.uploader.upload(
      imageCardFile.tempFilePath,
      {
        folder: 'Pigmeo/cards',
        use_filename: true,
        unique_filename: false
      }
    )
    
    const imageUrl = uploadedImage.secure_url

    const newCard = await fetchPost({...cardData, image: imageUrl})

    res.status(200).json(newCard)

  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const getCardCtrl = async (_req: Request, res: Response) => {
  try {
    const getAllCards = await fetchGet()
    res.status(200).json(getAllCards)
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: 'Does not exist card'})
  }
}

const findCardByType = async (req: Request, res: Response) => {
  try {
    const typeCard= req.params.cardType
    const getCardByName = await findCardType(typeCard)
    res.status(200).json(getCardByName)
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: 'Does not exist card'})
  }
}

export {
  postCardCtrl,
  getCardCtrl,
  findCardByType
}