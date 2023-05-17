//TODO: Validaciones

import { IUser } from '../interfaces/user.interface'
import User from '../models/users.models'

const fetchGet = async() => {
  try {
    const users = await User.find({});
    return { error: false, data: users };
  } catch (error) {
    return { error: true, data: error };
  }
}

const fetchPut = async(user: any) => {
  try {
    
    
  } catch (error) {
    
  }
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

export { fetchGet, fetchPut, fetchPost }
