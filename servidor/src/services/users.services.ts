//TODO: Validaciones

import { IUser } from '../interfaces/user.interface'
import User from '../models/users.models'

const fetchGet = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 3000)
  })
}

const fetchPost = async (user: IUser) => {
  try {
    const newUser = await User.create(user)
    console.log(newUser)
    return newUser
  } catch (e) {
    throw new Error(e as string)
  }
}

export { fetchGet, fetchPost }
