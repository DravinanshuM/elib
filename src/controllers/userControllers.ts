import { Request, Response, NextFunction } from "express";

const userCreate = async(req: Request, res: Response, next: NextFunction) =>{

    res.status(201).json({
        message: "user created"
    });
}

export { userCreate }