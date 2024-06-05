import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import createHttpError from "http-errors";

const app = express();

// Routing.
app.get("/", (req, res, next) => {
    // Creating an HTTP error
    const error = createHttpError(400, "something went wrong");
    // Passing the error to the next middleware
    next(error);
});

app.use(globalErrorHandler);

export default app;
