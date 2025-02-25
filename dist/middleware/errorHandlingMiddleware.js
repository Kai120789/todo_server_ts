"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiErrors_1 = __importDefault(require("../errors/ApiErrors"));
module.exports = function (err, req, res, next) {
    if (err instanceof ApiErrors_1.default) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: "error" });
};
