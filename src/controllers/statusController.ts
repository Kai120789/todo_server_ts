import models from '../models/models'
import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiErrors'

class StatusController {
    async create(req: Request, res: Response, next: NextFunction) {
        const {status} = req.body
        try {
            const newStatus = await models.Statuses.create({status})
            res.json(newStatus)
        } catch (error) {
            return next(ApiError.internal('failed to create new status'))
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const statuses = await models.Statuses.findAll()
            res.json(statuses)
        } catch (error) {
            return next(ApiError.badRequest('failed to found statuses'))
        }
        
    }
    

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const status = await models.Statuses.findOne({where: {id}})

            if (!status) {
                return next(ApiError.badRequest('status not found'))
            }
            await models.Statuses.destroy({where: {id}})
            res.json({message: 'status deleted successfuly'})
        } catch (error) {
            return next(ApiError.badRequest('failed to delete statuses'))
        }
        
    }   
}

const statusController = new StatusController()

export default statusController