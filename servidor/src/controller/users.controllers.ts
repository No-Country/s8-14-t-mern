import { Request, Response } from 'express';
import UserService from '../services/users.services';

const userService = new UserService();

class UserController {
	get(_req: Request, res: Response): void {
		userService.get()
		res.status(200).json({ msg: 'users' });
	}
}

export {
	UserController
}