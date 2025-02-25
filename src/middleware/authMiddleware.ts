import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'
import ApiError from '../errors/ApiErrors';
import models from '../models/models';

interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload;
}

function JWTCheck(req: CustomRequest, res: Response, next: NextFunction) {
    if (req.method == 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1] as string
        if (!token) {
            return next(ApiError.unauthorized('user unauthorized'))
        }
        const secretKey = process.env.SECRET_KEY as string
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded
        return next()
    } catch (e) {
        return next(ApiError.unauthorized('user unauthorized'))
    }
}

export default JWTCheck