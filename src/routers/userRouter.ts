import express from 'express';
import { userCreate, userLogin, validateUserCreate, validateLoginUser } from '../controllers/userControllers';

const userRouter = express.Router();

// make user router.
userRouter.post("/register",validateUserCreate, userCreate);

// user registration.
userRouter.post("/login",validateLoginUser, userLogin);

export default userRouter;