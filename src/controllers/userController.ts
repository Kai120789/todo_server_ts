import { Request, Response } from "express";
import CreateUserDto from "../dto/user";

class UserController {
    async registration(req: Request<{}, {}, CreateUserDto>, res: Response) {
        const {login, password} = req.body
        res.status(201).send({login, password})
    }
}

export default new UserController()