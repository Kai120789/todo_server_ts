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
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
class Users extends sequelize_1.Model {
}
Users.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: sequelize_1.DataTypes.STRING, unique: true },
    password: { type: sequelize_1.DataTypes.STRING }
}, { sequelize: db_1.default, tableName: 'users' });
const Boards = db_1.default.define('boards', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false }
});
const Statuses = db_1.default.define('statuses', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: sequelize_1.DataTypes.STRING, allowNull: false }
});
const Tasks = db_1.default.define('tasks', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
});
const BoardsUsers = db_1.default.define('boards_users', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'users', // таблица, на которую ссылается userId
            key: 'id' // внешний ключ
        }
    },
    boardId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'boards', // таблица, на которую ссылается boardId
            key: 'id' // внешний ключ
        }
    }
});
Users.hasMany(Tasks);
Tasks.belongsTo(Users);
Statuses.hasMany(Tasks);
Tasks.belongsTo(Statuses);
Boards.hasMany(Tasks);
Tasks.belongsTo(Boards);
Users.belongsToMany(Boards, { through: BoardsUsers });
Boards.belongsToMany(Users, { through: BoardsUsers });
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
exports.default = {
    Users,
    Boards,
    Statuses,
    Tasks,
    BoardsUsers,
    initStatuses
};
