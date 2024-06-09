import express from 'express';
import { userCreate, validateUserCreate } from '../controllers/userControllers';

const userRouter = express.Router();

// make user router.
userRouter.post("/register",validateUserCreate, userCreate);

export default userRouter;