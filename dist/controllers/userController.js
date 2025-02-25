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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiErrors_1 = __importDefault(require("../errors/ApiErrors"));
const generateJWT = (id, login) => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error("SECRET_KEY is not defined");
    }
    const accessToken = jsonwebtoken_1.default.sign({ id, login }, secretKey, { expiresIn: Number(process.env.ACCESS_TIME) });
    const refreshToken = jsonwebtoken_1.default.sign({ id, login }, secretKey, { expiresIn: Number(process.env.REFRESH_TIME) });
    return { accessToken, refreshToken };
};
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                if (!login || !password) {
                    next(ApiErrors_1.default.badRequest("Incorrect login or password"));
                }
                const candidate = yield models_1.User.findOne({ where: { login } });
                if (candidate) {
                    next(ApiErrors_1.default.badRequest("User with this login already exists"));
                }
                const hashPassword = yield bcrypt_1.default.hash(password, 5);
                const user = yield models_1.User.create({ login, password: hashPassword });
                const { accessToken, refreshToken } = generateJWT(user.id, user.login);
                res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
                res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                res.json({ accessToken, user }).status(201);
            }
            catch (error) {
                next(ApiErrors_1.default.internal("Registration failed"));
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                const user = yield models_1.User.findOne({ where: { login } });
                if (!user) {
                    next(ApiErrors_1.default.internal("User not found"));
                }
                const comparedPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!comparedPassword) {
                    next(ApiErrors_1.default.internal("Invalid password"));
                }
                const { accessToken, refreshToken } = generateJWT(user.id, user.login);
                res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
                res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                res.json({ accessToken, user });
            }
            catch (error) {
                next(ApiErrors_1.default.internal("Login failed"));
            }
        });
    }
    check(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (!req.user) {
                    next(ApiErrors_1.default.unauthorized("Unauthorized"));
                }
                const { accessToken, refreshToken } = generateJWT((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, (_b = req.user) === null || _b === void 0 ? void 0 : _b.login);
                res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
                res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                res.json({ accessToken });
            }
            catch (error) {
                next(ApiErrors_1.default.internal("Token validation failed"));
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("accessToken");
                res.clearCookie("refreshToken");
                res.json({ message: "Successfully logged out" });
            }
            catch (error) {
                next(ApiErrors_1.default.internal("Logout failed"));
            }
        });
    }
}
exports.default = new UserController();
