import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { ServerError } from "./../types";
import recipeRouter from "./routes/recipe";
const PORT = 3000;
const app = express();

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  return res.status(200).json({ a: 1 });
});

app.use("/recipe", recipeRouter);

// Catch-All Error Handler
app.use("/", (req: Request, res: Response): Response => {
  return res.status(404).json({ error: "Endpoint does not exist" });
});

// Global Error Handler
app.use(
  (
    err: ServerError,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    const defaultErr: ServerError = {
      log: { err: "Express error handler caught unknown middleware error" },
      status: 500,
      message: "internal server error: HELLLO",
    };

    const errorObj: ServerError = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
