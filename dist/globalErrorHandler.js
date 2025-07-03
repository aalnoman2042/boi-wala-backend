"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const errorFormate_1 = require("./errorFormate");
const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        res.status(400).json((0, errorFormate_1.formatErrorResponse)(err));
    }
    else {
        res.status(500).json((0, errorFormate_1.formatErrorResponse)(err));
    }
};
exports.default = globalErrorHandler;
