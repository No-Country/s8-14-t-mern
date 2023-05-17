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
    const userMatch = await User.find({ id: user.id });
    firstName
lastname
typeIdentification
numberIdentification
alias
phoneNumber
email
address
avatar
password
balance
isActive
rol
token
    const firstName = user.firstName !== "" ? user.firstName : userMatch.firstName;
    const lastname = user.lastname !== "" ? user.lastname : userMatch.lastname;
    const typeIdentification = user.typeIdentification !== "" ? user.typeIdentification : userMatch.typeIdentification
    const price = user.price !== "" ? user.price : userMatch.price
    const time = user.time !== "" ? user.time : userMatch.time
    const description = user.description !== "" ? user.description : userMatch.description
    const available = user.available !== "" ? user.available : userMatch.available

    const resp = await User.findByIdAndUpdate(
      user.id,
      {
        $set: { firstName, image, category, price, time, description, available },
      },
      { new: true }
    );
    return {
      error: false,
      data: resp,
    };
  } catch (error) {
    console.log(error);
    return { data: error };
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
