import express, { NextFunction, Request, Response } from "express"
import router from "./routes"
require('dotenv').config()
import sequelize from './db'

const app = express()

app.use(express.json())
app.use('/api', router)

const PORT = 3000
const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Running on Port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()