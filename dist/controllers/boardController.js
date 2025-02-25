"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/models");
const ApiErrors_1 = __importDefault(require("../errors/ApiErrors"));
class BoardsController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            try {
                const board = yield models_1.Board.create({ name });
                res.json(board).status(201);
            }
            catch (error) {
                next(ApiErrors_1.default.internal('failed to create new board'));
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const { id } = req.params;
            const board = yield models_1.Board.findOne({ where: { id } });
            if (!board) {
                next(ApiErrors_1.default.badRequest('board not found'));
            }
            yield models_1.Board.update({ name }, { where: { id } });
            const updBoard = yield models_1.Board.findOne({ where: { id } });
            res.json(updBoard).status(200);
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const boards = yield models_1.Board.findAll();
            res.json(boards).status(200);
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const board = yield models_1.Board.findOne({ where: { id } });
            res.json(board).status(200);
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const board = yield models_1.Board.findOne({ where: { id } });
            if (!board) {
                return next(ApiErrors_1.default.badRequest('board not found'));
            }
            yield models_1.Board.destroy({ where: { id } });
            res.json({ message: 'board deleted successfuly' }).status(200);
        });
    }
    addUserToBoard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { boardId } = req.params;
            const { userId } = req.body;
            const board2user = yield models_1.BoardUser.create({ boardId, userId });
            res.json(board2user).status(200);
        });
    }
    getAllBoardsByUserID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params;
            const board2user = yield models_1.BoardUser.findAll({ where: userId });
            res.json(board2user).status(200);
        });
    }
}
const boardController = new BoardsController();
exports.default = boardController;
