import { Router } from 'express'
import { criptoController
} from '../controller/cripto.controllers'

const router = Router()

// verify receiver's account number

router.get('/info', criptoController)

export { router }
