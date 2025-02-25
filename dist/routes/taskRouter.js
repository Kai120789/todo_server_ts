"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const taskController_1 = __importDefault(require("../controllers/taskController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
router.post('/', authMiddleware_1.default, taskController_1.default.create); // create task
router.put('/:id', authMiddleware_1.default, taskController_1.default.updateTask); // update task
router.get('/', authMiddleware_1.default, taskController_1.default.getAll); // get all tasks
router.get('/:id', authMiddleware_1.default, taskController_1.default.getOne); // get task by id
router.delete('/:id', authMiddleware_1.default, taskController_1.default.delete); // delete task by id
module.exports = router;
