"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const boardRouter = require('./boardRouter');
const taskRouter = require('./taskRouter');
const userRouter = require('./userRouter');
const statusRouter = require('./statusRouter');
router.use('/user', userRouter);
router.use('/board', boardRouter);
router.use('/task', taskRouter);
router.use('/status', statusRouter);
exports.default = router;
