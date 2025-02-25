import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiErrors'


const handler: ErrorRequestHandler = function (err: ApiError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        res.status(err.status).json({message: err.message})
    }
    res.status(500).json({message: "error"})
}

export default handler