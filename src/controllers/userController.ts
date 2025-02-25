import { NextFunction, Request, Response } from "express";
import CreateUserDto from "../dto/user";
import models from '../models/models'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import ApiError from "../errors/ApiErrors";

const generateJWT = (id: number, login: string) => {
    const secretKey = process.env.SECRET_KEY;
    
    if (!secretKey) {
        throw new Error('SECRET_KEY is not defined');
    }

    const accessToken = jwt.sign(
        { id, login },
        secretKey,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { id, login },
        secretKey,
        { expiresIn: '30d' }
    );

    return { accessToken, refreshToken };
};


class UserController {
    async registration(req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) {
        try {
            const {login, password} = req.body
            const candidate = await models.Users.findOne({ where: {login} })
            if (candidate) {
                next(ApiError.internal('user with this email is already exists'))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await models.Users.create({ login, password: hashPassword })
            const {accessToken, refreshToken} = generateJWT(user.id, user.login)
        
            res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 })

            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

            res.status(201).json({user})
        } catch (error) {
            next(ApiError.internal('registration error'))
        }
    }

    async login(req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) {
        try {
            const {login, password} = req.body
            const user = await models.Users.findOne({ where: {login} })
            if (!user) {
                return next(ApiError.internal('user not found'))
            }
            const comparedPassword = bcrypt.compareSync(password, user.password)
            if (!comparedPassword) {
                return next(ApiError.internal('not valid password'))
            }
            const {accessToken, refreshToken} = generateJWT(user.id, user.login)
        
            res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 })

            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

            res.status(200).json({user})
        } catch (error) {
            next(ApiError.internal('login error'))
        }
    }

    async check(req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) {
        try {
            const {login, password} = req.body

            const user = await models.Users.findOne({ where: {login} })
            if (!user) {
                return next(ApiError.internal('user not found'))
            }

            const {accessToken, refreshToken} = generateJWT(user.id, user.login)
            
            res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 })

            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            
            res.json({accessToken})
        } catch (error) {
            next(ApiError.internal('check error'))
        }
    }

    async logout(req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) {
        try {
            const {login} = req.body
            const user = await models.Users.findOne({where: {login}})
            if (!user) {
                next(ApiError.internal('user not found'))
            }

            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");

            res.json({message: 'successfully logged out'})
        } catch (error) {
            next(ApiError.internal('logout error'))
        }
    }
}

export default new UserController()