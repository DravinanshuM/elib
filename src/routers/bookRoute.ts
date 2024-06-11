import express from 'express';
import { createBook } from '../controllers/bookControlles';

const bookRouter = express.Router();

// add router here.
bookRouter.post('/', createBook);

export default bookRouter;