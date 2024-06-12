import express from 'express';
import { createBook } from '../controllers/bookControlles';

// upload folder inside file upload.
import uploads from '../middlewares/multerMiddleware';

const bookRouter = express.Router();

// add router here. 1. for create Book.
bookRouter.post('/', uploads.fields([
    { name: "CoverImage", maxCount: 1},
    { name: "file", maxCount: 1 }
]), createBook);

export default bookRouter;