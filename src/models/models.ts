import sequelize from '../db'
import DataTypes from 'sequelize'

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

const Boards = sequelize.define('boards', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const Statuses = sequelize.define('statuses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING, allowNull: false}
})

const Tasks = sequelize.define('tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const BoardsUsers = sequelize.define('boards_users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

Users.hasMany(Tasks)
Tasks.belongsTo(Users)

Statuses.hasMany(Tasks)
Tasks.belongsTo(Statuses)

Boards.hasMany(Tasks)
Tasks.belongsTo(Boards)

Users.belongsToMany(Boards, {through: BoardsUsers})
Boards.belongsToMany(Users, {through: BoardsUsers})

const initStatuses = async () => {
    try {
      await sequelize.query(`
        INSERT INTO statuses (id, status, "createdAt", "updatedAt")
        VALUES
          (1, 'in process', NOW(), NOW()),
          (2, 'done', NOW(), NOW()),
          (3, 'archived', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `);
      console.log('Statuses initialized successfully!');
    } catch (error) {
      console.error('Error initializing statuses:', error);
    }
};

export default {
    Users,
    Boards,
    Statuses,
    Tasks,
    BoardsUsers,
    initStatuses
}