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
class StatusController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status } = req.body;
            try {
                const newStatus = yield models_1.Status.create({ status });
                res.json(newStatus);
            }
            catch (error) {
                next(ApiErrors_1.default.internal('failed to create new status'));
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const statuses = yield models_1.Status.findAll();
            res.json(statuses);
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const status = yield models_1.Status.findOne({ where: { id } });
            if (!status) {
                next(ApiErrors_1.default.badRequest('status not found'));
            }
            yield models_1.Status.destroy({ where: { id } });
            res.json({ message: 'status deleted successfuly' });
        });
    }
}
exports.default = new StatusController();
