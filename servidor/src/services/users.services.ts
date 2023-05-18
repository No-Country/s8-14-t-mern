//TODO: Validaciones

import { IUser } from '../interfaces/user.interface'
import User from '../models/users.models'

const fetchGet = async () => {
  try {
    const users = await User.find({})
    if(users){
      return users
    }
  } catch (error) {
    throw new Error("error")
  }
}

 const fetchUserId = async (id: any) => {
  try {
    const userId = await User.findById(id)
    console.log(userId)
    if(userId){
      return userId
    }
  } catch (error) {
    throw new Error("error")
  }
 }

const fetchPut = async (user: any) => {
  try {
    // const userMatch = await User.find({ _id: user._id })
    // if (userMatch.length){
      
      // const firstName =
      //   user.firstName !== '' ? user.firstName : userMatch.firstName
      // const lastname = user.lastname !== '' ? user.lastname : userMatch.lastname
      // const typeIdentification =
      //   user.typeIdentification !== ''
      //     ? user.typeIdentification
      //     : userMatch.typeIdentification
      // const alias = user.alias !== '' ? user.alias : userMatch.alias
      // const phoneNumber =
      //   user.phoneNumber !== '' ? user.phoneNumber : userMatch.phoneNumber
      // const email = user.email !== '' ? user.email : userMatch.email
      // const address = user.address !== '' ? user.address : userMatch.address
      // const avatar = user.avatar !== '' ? user.avatar : userMatch.avatar
      // const password = user.password !== '' ? user.password : userMatch.password
      // const balance = user.balance !== '' ? user.balance : userMatch.balance
      // const isActive = user.isActive !== '' ? user.isActive : userMatch.isActive
      // const rol = user.rol !== '' ? user.rol : userMatch.rol
      // const token = user.token !== '' ? user.token : userMatch.token

    //   const resp = await User.findByIdAndUpdate(
    //     user.id,
    //     {
    //       $set: {
    //         firstName,
    //         lastname,
    //         typeIdentification,
    //         alias,
    //         phoneNumber,
    //         email,
    //         address,
    //         avatar,
    //         password,
    //         balance,
    //         isActive,
    //         rol,
    //         token
    //       }
    //     },
    //     { new: true }
    //   )
    //   return {
    //     error: false,
    //     data: resp
    //   }
    // }
  } catch (error) {
    console.log(error)
    return { data: error }
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

export { fetchGet, fetchUserId, fetchPut, fetchPost }
