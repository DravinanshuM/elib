import express from "express";
import { createBook } from "../controllers/bookControlles";
// upload folder inside file upload.
import upload from "../middlewares/multerMiddleware";
import authenticate from "../middlewares/Authenticate";

const bookRouter = express.Router();

// add router here. 1. for create Book.
bookRouter.post(
    "/",
    authenticate,
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    createBook
);

export default bookRouter;
