import mongoose, { type ConnectOptions } from 'mongoose'
import config from '../config'
interface Opt extends ConnectOptions {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}

const dataBase = () => {
  mongoose.set('strictQuery', false)

  const options: Opt = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  mongoose
    .connect(config?.database as string, options)
    .then(() => {
      console.log('Database connected')
    })
    .catch(err => {
      console.log('Database connection error', err)
    })
}

export default dataBase
