import { Router } from 'express'
import { findCardByType, getCardCtrl, postCardCtrl } from '../controller/cards.controllers'


const router = Router()

router.post('/create', postCardCtrl)
router.get('/', getCardCtrl)
router.get('/:card-type', findCardByType) //No funciona aun

export { router }

