"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const statusController_1 = __importDefault(require("../controllers/statusController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.default)();
router.post('/', authMiddleware_1.default, statusController_1.default.create);
router.get('/', authMiddleware_1.default, statusController_1.default.getAll);
router.delete('/:id', authMiddleware_1.default, statusController_1.default.delete);
exports.default = router;
