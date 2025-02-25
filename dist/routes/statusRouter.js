"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const statusController = require("../controllers/statusController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
router.post('/', authMiddleware_1.default, statusController.create);
router.get('/', authMiddleware_1.default, statusController.getAll);
router.delete('/:id', authMiddleware_1.default, statusController.delete);
module.exports = router;
