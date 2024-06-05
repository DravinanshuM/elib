import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./routers/userRouter";

const app = express();

// default Routing.
app.get("/", (req, res) => {
    res.send("server start....");
});

app.use('/api/users', userRouter);
app.use(globalErrorHandler);

export default app;
