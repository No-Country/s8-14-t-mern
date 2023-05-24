import express, { Application } from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import morgan from 'morgan'
import config from './config'
import dataBase from './utils/database'
import mainRouter from './routes'

class Server {
  private app: Application

  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  private config(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors(config.corsOptions))
    this.app.use(morgan('tiny'))
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: './assets/tmp',
        createParentPath: true
      })
    )
    // Aquí se puede configurar cualquier otra opción de la aplicación
  }

  private routes(): void {
    // Aquí se pueden agregar más rutas o middlewares si es necesario
    this.app.use('/api/v1/pigmeo', mainRouter)
  }

  public listen(): void {
    dataBase()
    this.app.listen(config.port, () => {
      console.log(`Server started at ${config.port}`)
    })
  }
}

export default Server
