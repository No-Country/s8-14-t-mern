import { Request, Response, Router } from 'express'
import { readdirSync } from 'fs'
const mainRouter = Router()
const PATH_ROUTES = `${__dirname}`

type ModuleRouter = {
  router: Router
}

// Remover extension del nombre del archivo
const removeExtension = (filename: string): string => {
  return filename.split('.').shift() as string
}
// Import de todos los routers del directorio /routes
readdirSync(PATH_ROUTES)
  .filter(file => {
    const cleanName = removeExtension(file)
    return cleanName !== 'index'
  })
  .forEach(file => {
    const cleanName = removeExtension(file)
    import(`./${cleanName}.routes`)
      .then((moduleRouter: ModuleRouter) => {
        console.log(`Cargando ruta: ${cleanName} ...`)
        mainRouter.use(`/${cleanName}`, moduleRouter.router)
      })
      .catch(err => {
        console.log(`No se pudo cargar ruta ${cleanName}`, err)
      })
  })

//default index
mainRouter.get('/', (_req: Request, res: Response) => {
  res.send('Ok')
})

export default mainRouter
