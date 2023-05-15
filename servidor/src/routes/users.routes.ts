import { Router } from 'express'
import { getUserCtrl } from '../controller/users.controllers'

const router = Router()

router.get('/', getUserCtrl)

export { router }
