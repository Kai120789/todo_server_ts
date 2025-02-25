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
class TaskController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, userId, boardId } = req.body;
            try {
                const task = yield models_1.Task.create({ title, description, userId, boardId, statusId: 1 });
                res.json(task);
            }
            catch (error) {
                next(ApiErrors_1.default.internal('failed to create new task'));
            }
        });
    }
    updateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, userId, boardId, statusId } = req.body;
            const { id } = req.params;
            const task = yield models_1.Task.findOne({ where: { id } });
            if (!task) {
                next(ApiErrors_1.default.internal('task not found'));
            }
            yield models_1.Task.update({ title, description, userId, boardId, statusId }, { where: { id } });
            const updTask = yield models_1.Task.findOne({ where: { id } });
            res.json(updTask);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield models_1.Task.findAll();
            res.json(tasks);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const task = yield models_1.Task.findOne({ where: { id } });
            res.json(task);
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const task = yield models_1.Task.findOne({ where: { id } });
            if (!task) {
                next(ApiErrors_1.default.internal('task not found'));
            }
            yield models_1.Task.destroy({ where: { id } });
            res.json({ message: 'task deleted successfuly' });
        });
    }
}
exports.default = new TaskController();
