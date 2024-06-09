import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./routers/userRouter";

const app = express();

// default Routing.
app.get("/", (req, res) => {
    res.send("server start....");
});

// it is a middleware for parsing the data.
app.use(express.json());

app.use('/api/users', userRouter);
app.use(globalErrorHandler);

export default app;
