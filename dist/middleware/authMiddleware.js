"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, res, next) {
    var _a;
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Применение безопасной опциональной цепочки
        if (!token) {
            res.status(401).json({ message: "User unauthorized" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY); // Приведение SECRET_KEY к типу string
        req.user = decoded; // Установка данных пользователя в запрос
        next();
    }
    catch (e) {
        res.status(401).json({ message: "User unauthorized" });
    }
}
