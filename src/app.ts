import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./routers/userRouter";
import bookRouter from "./routers/bookRoute";

const app = express();

// default Routing.
app.get("/", (req, res) => {
    res.send("server start....");
});

// it is a middleware for parsing the data.
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes here.
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use(globalErrorHandler);

export default app;
