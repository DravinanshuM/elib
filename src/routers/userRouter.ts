import express from 'express';
import { userCreate } from '../controllers/userControllers';

const userRouter = express.Router();

// make user router.
userRouter.post("/register", userCreate);

export default userRouter;