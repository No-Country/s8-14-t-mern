import dotenv from 'dotenv'

dotenv.config()
const config = {
  port: process.env.PORT || 9000,
  nodeENV: process.env.NODE_ENV || 'development',
  database: process.env.DB_URI,
  corsOptions: {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
  }
}

export default config
