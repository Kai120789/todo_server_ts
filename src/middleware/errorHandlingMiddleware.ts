import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiErrors'


function handler(err: any, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err); // Skip the response if headers are already sent
    }

    res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
}


export default handler