import { Router } from 'express'
import {
  getAllCardsOfUserCtrl,
  getCardsOfUserByIdCtrl,
  patchCardsOfUserCtrl,
  postCardOfUserCtrl
} from '../controller/cardsOfUser.controllers'

const router = Router()

router.post('/add-card', postCardOfUserCtrl)
router.get('/', getAllCardsOfUserCtrl)
router.get('/:id', getCardsOfUserByIdCtrl)
router.patch('/:id', patchCardsOfUserCtrl)

export { router }
