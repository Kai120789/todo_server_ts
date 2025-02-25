require('dotenv').config()
import express, { NextFunction, Request, Response } from "express"
import router from "./routes"
import sequelize from './db'
import models from './models/models'
import errorHandler from './middleware/errorHandlingMiddleware'
import cors from 'cors'

const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

const PORT = Number(process.env.PORT) || 3000
const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync();
        models.initStatuses()
        app.listen(PORT, () => {
            console.log(`Running on Port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()