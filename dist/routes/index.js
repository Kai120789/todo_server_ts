"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const userRouter_1 = __importDefault(require("./userRouter"));
const statusRouter_1 = __importDefault(require("./statusRouter"));
const boardRouter_1 = __importDefault(require("./boardRouter"));
const taskRouter_1 = __importDefault(require("./taskRouter"));
router.use('/user', userRouter_1.default);
router.use('/status', statusRouter_1.default);
router.use('/board', boardRouter_1.default);
router.use('/task', taskRouter_1.default);
exports.default = router;
