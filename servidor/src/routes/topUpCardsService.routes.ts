import { Router } from 'express'
import {
  getAllTopUpCardCtrl,
  postTopUpCardCtrl
} from '../controller/topUpCardsService.controllers'

const router = Router()

router.post('/top-up', postTopUpCardCtrl)
router.get('/top-up-by-user/:id', getAllTopUpCardCtrl)

export { router }
