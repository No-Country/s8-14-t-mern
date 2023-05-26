import dotenv from 'dotenv'

dotenv.config()
const config = {
  port: process.env.PORT || 9000,
  nodeENV: process.env.NODE_ENV || 'development',
  database: process.env.DB_URI,
  cloudinary: process.env.CLOUDINARY_URL,
  corsOptions: {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
  },
  //nodemailer
  transportOptions: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  }
}

export default config
