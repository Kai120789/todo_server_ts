import sequelize from '../db'
import { Sequelize, DataTypes, Model, Optional } from 'sequelize'

interface UserAttributes {
  id: number;
  login: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class Users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public login!: string;
  public password!: string;
}

Users.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
  },
  { sequelize, tableName: 'users' }
);

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

Users.hasMany(Tasks, { foreignKey: 'userId' });
Tasks.belongsTo(Users, { foreignKey: 'userId' });

Statuses.hasMany(Tasks, { foreignKey: 'statusId' });
Tasks.belongsTo(Statuses, { foreignKey: 'statusId' });

Boards.hasMany(Tasks, { foreignKey: 'boardId' });
Tasks.belongsTo(Boards, { foreignKey: 'boardId' });

Users.belongsToMany(Boards, { through: BoardsUsers, foreignKey: 'userId' });
Boards.belongsToMany(Users, { through: BoardsUsers, foreignKey: 'boardId' });


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