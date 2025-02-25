import {Sequelize} from 'sequelize'

const sequelize = new Sequelize(
    
    <string>process.env.POSTGRES_DB,
    <string>process.env.POSTGRES_USER,
    <string>process.env.POSTGRES_PASSWORD,
    {
        dialect: 'postgres',
        host: <string>process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT)
    }
)

export default sequelize