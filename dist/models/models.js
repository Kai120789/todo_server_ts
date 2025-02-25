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
exports.initStatuses = exports.BoardUser = exports.Task = exports.Status = exports.Board = exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: sequelize_1.DataTypes.STRING, unique: true },
    password: { type: sequelize_1.DataTypes.STRING }
}, { sequelize: db_1.default, tableName: 'users' });
class Board extends sequelize_1.Model {
}
exports.Board = Board;
Board.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false }
}, { sequelize: db_1.default, tableName: 'boards' });
class Status extends sequelize_1.Model {
}
exports.Status = Status;
Status.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: sequelize_1.DataTypes.STRING, allowNull: false }
}, { sequelize: db_1.default, tableName: 'statuses' });
class Task extends sequelize_1.Model {
}
exports.Task = Task;
Task.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false }
}, { sequelize: db_1.default, tableName: 'tasks' });
class BoardUser extends sequelize_1.Model {
}
exports.BoardUser = BoardUser;
BoardUser.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, { sequelize: db_1.default, tableName: 'boards_users' });
User.hasMany(Task);
Task.belongsTo(User);
Status.hasMany(Task);
Task.belongsTo(Status);
Board.hasMany(Task);
Task.belongsTo(Board);
User.belongsToMany(Board, { through: BoardUser });
Board.belongsToMany(User, { through: BoardUser });
const initStatuses = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.query(`
      INSERT INTO statuses (id, status, "createdAt", "updatedAt")
      VALUES
        (1, 'in process', NOW(), NOW()),
        (2, 'done', NOW(), NOW()),
        (3, 'archived', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);
        console.log('Statuses initialized successfully!');
    }
    catch (error) {
        console.error('Error initializing statuses:', error);
    }
});
exports.initStatuses = initStatuses;
exports.default = { User, Board, Status, Task, BoardUser, initStatuses };
