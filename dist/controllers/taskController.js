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
class TaskController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, userId, boardId } = req.body;
                const task = yield models_1.default.Tasks.create({ title, description, userId, boardId, statusId: 1 });
                res.json(task);
            }
            catch (error) {
                return next(ApiErrors_1.default.internal('failed to create new task'));
            }
        });
    }
    updateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, userId, boardId, statusId } = req.body;
                const { id } = req.params;
                const task = yield models_1.default.Tasks.findOne({ where: { id } });
                if (!task) {
                    return next(ApiErrors_1.default.badRequest('task not found'));
                }
                yield models_1.default.Tasks.update({ title, description, userId, boardId, statusId }, { where: { id } });
                const updTask = yield models_1.default.Tasks.findOne({ where: { id } });
                res.json(updTask);
            }
            catch (error) {
                return next(ApiErrors_1.default.badRequest('task update error'));
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield models_1.default.Tasks.findAll();
                res.json(tasks);
            }
            catch (error) {
                return next(ApiErrors_1.default.badRequest('get tasks error'));
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const task = yield models_1.default.Tasks.findOne({ where: { id } });
                res.json(task);
            }
            catch (error) {
                return next(ApiErrors_1.default.badRequest('get task error'));
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const task = yield models_1.default.Tasks.findOne({ where: { id } });
                if (!task) {
                    return next(ApiErrors_1.default.badRequest('task not found'));
                }
                yield models_1.default.Tasks.destroy({ where: { id } });
                res.json({ message: 'task deleted successfuly' });
            }
            catch (error) {
                return next(ApiErrors_1.default.badRequest('task delete error'));
            }
        });
    }
}
const taskController = new TaskController();
exports.default = taskController;
