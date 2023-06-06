import { Request, Response } from 'express';
import { criptoFetch } from '../services/cripto.services'
const criptoController = async (req: Request, res: Response) => {
    try {
        const info = await criptoFetch()
        if (info !== undefined){
            if (info){
                res.status(200).json(info)
            }

        }
    } catch (error) {
        res.status(404).json(error)
    }

}

export {
    criptoController
}