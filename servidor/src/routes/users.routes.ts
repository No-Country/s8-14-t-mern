import { Router } from 'express'
import { getUserCtrl, getUserId, putUserCtrl, postUserCtrl } from '../controller/users.controllers'

const router = Router()

router.route('/').get(getUserCtrl)

router.get('/:id', getUserId)

router.put('/edit', putUserCtrl)

router.post('/register', postUserCtrl)

// put - delete
// router.route('/:id')
// .put(...)
// .post(...)

//TODO:
/*
	/login
	/register
*/

export { router }
