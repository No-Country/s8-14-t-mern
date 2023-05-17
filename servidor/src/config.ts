import dotenv from 'dotenv'

dotenv.config()
const config = {
  port: process.env.PORT || 9000,
  nodeENV: process.env.NODE_ENV || 'development',
  database:
    process.env.DB_URI ||
    'mongodb+srv://marda_devback:gU5IY2ckVUJsRfo0@cluster0.hqaetjz.mongodb.net/pigmeo',
  corsOptions: {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
  }
}

export default config
