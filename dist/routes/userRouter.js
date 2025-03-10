"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.default)();
router.post('/registration', userController_1.default.registration);
router.post('/login', userController_1.default.login);
router.get('/', authMiddleware_1.default, userController_1.default.check);
router.delete('/logout', authMiddleware_1.default, userController_1.default.logout);
exports.default = router;
