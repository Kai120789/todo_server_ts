import { NextFunction, Request, Response } from "express"
import CreateTaskDto from "../dto/task"

import models from '../models/models'
import ApiError from '../errors/ApiErrors'

class TaskController {
    async create(req: Request<{}, {}, CreateTaskDto>, res: Response, next: NextFunction) {
        try {
            const {title, description, userId, boardId} = req.body
            const task = await models.Tasks.create({title, description, userId, boardId, statusId : 1})
            res.json(task)
        } catch (error) {
            return next(ApiError.internal('failed to create new task'))
        }
    }

    async updateTask(req: Request<{id: string}, {}, CreateTaskDto>, res: Response, next: NextFunction) {
        try {
            const {title, description, userId, boardId, statusId} = req.body 
            const {id} = req.params
            const task = await models.Tasks.findOne({where: {id}})
            if (!task) {
                return next(ApiError.badRequest('task not found'))
            }

            await models.Tasks.update({title, description, userId, boardId, statusId}, {where: {id}})
            const updTask = await models.Tasks.findOne({where: {id}})
            res.json(updTask)
        } catch (error) {
            return next(ApiError.badRequest('task update error'))
        }
        
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = await models.Tasks.findAll()
            res.json(tasks)
        } catch (error) {
            return next(ApiError.badRequest('get tasks error'))
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const task = await models.Tasks.findOne({where: {id}})
            res.json(task)
        } catch (error) {
            return next(ApiError.badRequest('get task error'))
        }
    }
    

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const task = await models.Tasks.findOne({where: {id}})

            if (!task) {
                return next(ApiError.badRequest('task not found'))
            }
            await models.Tasks.destroy({where: {id}})
            res.json({message: 'task deleted successfuly'})
        } catch (error) {
            return next(ApiError.badRequest('task delete error'))
        }
    }
}

const taskController = new TaskController()
export default taskController