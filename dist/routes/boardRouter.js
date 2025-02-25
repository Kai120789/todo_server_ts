"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boardController_1 = __importDefault(require("../controllers/boardController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.default)();
router.post('/', authMiddleware_1.default, boardController_1.default.create); // create board
router.put('/:id', authMiddleware_1.default, boardController_1.default.update); // update board
router.get('/', authMiddleware_1.default, boardController_1.default.getAll); // get all boards
router.get('/:id', authMiddleware_1.default, boardController_1.default.getOne); // get board by id
router.delete('/:id', authMiddleware_1.default, boardController_1.default.delete); // delete board by id
router.post('/add/:boardId', authMiddleware_1.default, boardController_1.default.addUserToBoard); // add user to board
router.get('/user/:userId', authMiddleware_1.default, boardController_1.default.getAllBoardsByUserID); // get all boards
exports.default = router;
