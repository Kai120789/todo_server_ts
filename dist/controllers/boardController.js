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
const models_1 = __importDefault(require("../models/models"));
const ApiErrors_1 = __importDefault(require("../errors/ApiErrors"));
class BoardsController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const board = yield models_1.default.Boards.create({ name });
                res.json(board);
            }
            catch (error) {
                return next(ApiErrors_1.default.internal('failed to create new board'));
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const { id } = req.params;
                const board = yield models_1.default.Boards.findOne({ where: { id } });
                if (!board) {
                    return next(ApiErrors_1.default.badRequest('board not found'));
                }
                yield models_1.default.Boards.update({ name }, { where: { id } });
                const updBoard = yield models_1.default.Boards.findOne({ where: { id } });
                res.json(updBoard);
            }
            catch (error) {
                return next(ApiErrors_1.default.badRequest('board update error'));
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const boards = yield models_1.default.Boards.findAll();
                res.json(boards);
            }
            catch (error) {
                return next(ApiErrors_1.default.badRequest('get boards error'));
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const board = yield models_1.default.Boards.findOne({ where: { id } });
                res.json(board);
            }
            catch (error) {
                return next(ApiErrors_1.default.badRequest('get board error'));
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const board = yield models_1.default.Boards.findOne({ where: { id } });
                if (!board) {
                    return next(ApiErrors_1.default.badRequest('board not found'));
                }
                yield models_1.default.Boards.destroy({ where: { id } });
                res.json({ message: 'board deleted successfuly' });
            }
            catch (error) {
                return next(ApiErrors_1.default.badRequest('board delete error'));
            }
        });
    }
    addUserToBoard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { boardId } = req.params;
                const { userId } = req.body;
                const board = yield models_1.default.Boards.findOne({ where: { id: boardId } });
                if (!board) {
                    return next(ApiErrors_1.default.badRequest('Board not found'));
                }
                const board2user = yield models_1.default.BoardsUsers.create({ boardId, userId });
                res.json(board2user);
            }
            catch (error) {
                return next(ApiErrors_1.default.badRequest('add user to board error'));
            }
        });
    }
    getAllBoardsByUserID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params;
                const board2user = yield models_1.default.BoardsUsers.findAll({ where: userId });
                res.json(board2user);
            }
            catch (error) {
                return next(ApiErrors_1.default.badRequest('get all user boards error'));
            }
        });
    }
}
const boardsController = new BoardsController();
exports.default = boardsController;
