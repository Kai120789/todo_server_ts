"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const models_1 = __importDefault(require("../models/models"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const ApiErrors_1 = __importDefault(require("../errors/ApiErrors"));
const generateJWT = (id, login) => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error('SECRET_KEY is not defined');
    }
    const accessToken = jwt.sign({ id, login }, secretKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id, login }, secretKey, { expiresIn: '30d' });
    return { accessToken, refreshToken };
};
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                const candidate = yield models_1.default.Users.findOne({ where: { login } });
                if (candidate) {
                    next(ApiErrors_1.default.internal('user with this email is already exists'));
                }
                const hashPassword = yield bcrypt.hash(password, 5);
                const user = yield models_1.default.Users.create({ login, password: hashPassword });
                const { accessToken, refreshToken } = generateJWT(user.id, user.login);
                res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
                res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                res.status(201).json({ accessToken });
            }
            catch (error) {
                next(ApiErrors_1.default.internal('registration error'));
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                const user = yield models_1.default.Users.findOne({ where: { login } });
                if (!user) {
                    return next(ApiErrors_1.default.internal('user not found'));
                }
                const comparedPassword = bcrypt.compareSync(password, user.password);
                if (!comparedPassword) {
                    return next(ApiErrors_1.default.internal('not valid password'));
                }
                const { accessToken, refreshToken } = generateJWT(user.id, user.login);
                res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
                res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                res.status(200).json({ accessToken });
            }
            catch (error) {
                next(ApiErrors_1.default.internal('login error'));
            }
        });
    }
    check(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                const user = yield models_1.default.Users.findOne({ where: { login } });
                if (!user) {
                    return next(ApiErrors_1.default.internal('user not found'));
                }
                const { accessToken, refreshToken } = generateJWT(user.id, user.login);
                res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
                res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                res.json({ accessToken });
            }
            catch (error) {
                next(ApiErrors_1.default.internal('check error'));
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login } = req.body;
                const user = yield models_1.default.Users.findOne({ where: { login } });
                if (!user) {
                    next(ApiErrors_1.default.internal('user not found'));
                }
                res.clearCookie("accessToken");
                res.clearCookie("refreshToken");
                res.json({ message: 'successfully logged out' });
            }
            catch (error) {
                next(ApiErrors_1.default.internal('logout error'));
            }
        });
    }
}
exports.default = new UserController();
