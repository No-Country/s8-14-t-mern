import express, { Application } from 'express'
import { json, urlencoded } from 'body-parser'
import dataBase from './utils/database'
import config from './config'
import mainRouter from './routes'

class Server {
	private app: Application

	constructor() {
		this.app = express()
		this.config()
		this.routes()
	}

	private config(): void {
		this.app.use(json())
		this.app.use(urlencoded({ extended: true }))
		//TODO: install CORS, MORGAN
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
