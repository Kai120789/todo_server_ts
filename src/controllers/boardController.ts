import models from '../models/models'
import ApiError from '../errors/ApiErrors'
import { NextFunction, Request, Response } from 'express'

class BoardsController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {name} = req.body
            const board = await models.Boards.create({name})
            res.json(board)
        } catch (error) {
            return next(ApiError.internal('failed to create new board'))
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {name} = req.body 
            const {id} = req.params
            const board = await models.Boards.findOne({where: {id}})
            if (!board) {
                return next(ApiError.badRequest('board not found'))
            }

            await models.Boards.update({name}, {where: {id}})
            const updBoard = await models.Boards.findOne({where: {id}})
            res.json(updBoard)
        } catch (error) {
            return next(ApiError.badRequest('board update error'))
        }
        
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const boards = await models.Boards.findAll()
            res.json(boards)
        } catch (error) {
            return next(ApiError.badRequest('get boards error'))
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const board = await models.Boards.findOne({where: {id}})
            res.json(board)
        } catch (error) {
            return next(ApiError.badRequest('get board error'))
        }
    }
    

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const board = await models.Boards.findOne({where: {id}})

            if (!board) {
                return next(ApiError.badRequest('board not found'))
            }
            await models.Boards.destroy({where: {id}})
            res.json({message: 'board deleted successfuly'})
        } catch (error) {
            return next(ApiError.badRequest('board delete error'))
        }
    }

    async addUserToBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const {boardId} = req.params
            const {userId} = req.body
            const board = await models.Boards.findOne({ where: { id: boardId } })
            if (!board) {
                return next(ApiError.badRequest('Board not found'))
            }
            const board2user = await models.BoardsUsers.create({boardId, userId})
            res.json(board2user)
        } catch (error) {
            return next(ApiError.badRequest('add user to board error'))
        }
    }

    async getAllBoardsByUserID(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params
            const board2user = await models.BoardsUsers.findAll({where: userId})
            res.json(board2user)
        } catch (error) {
            return next(ApiError.badRequest('get all user boards error'))
        }
        
    }
}

const boardsController = new BoardsController()
export default boardsController