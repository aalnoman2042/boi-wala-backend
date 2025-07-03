// src/middlewares/globalErrorHandler.ts
import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { formatErrorResponse } from "./errorFormate";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json(formatErrorResponse(err));
  } else {
    res.status(500).json(formatErrorResponse(err));
  }
};

export default globalErrorHandler;
