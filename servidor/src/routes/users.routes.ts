import { Router } from 'express';
import { UserController } from '../controller/users.controllers';

const router = Router()

const userControler = new UserController()
router.get('/', userControler.get)

export { router }