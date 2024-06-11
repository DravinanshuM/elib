import { Request, Response, NextFunction } from "express"

const createBook = async(req: Request, res: Response, next: NextFunction) => {
   res.status(200).json({ message: "ok" });
}

export { createBook };