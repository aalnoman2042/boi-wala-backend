import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/routes/book.route";
import { borrowRoutes } from "./app/routes/borrow.route";
import globalErrorHandler from "./globalErrorHandler";

const app: Application = express()

// app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to library managment");
});

app.use('/boi-wala/books', bookRoutes)
app.use('/boi-wala/borrow', borrowRoutes)

// Not Found route 
app.use((req: Request, res: Response, next: Function) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    error: `Route ${req.originalUrl} does not exist`,
  });
});


app.use(globalErrorHandler)
export default app