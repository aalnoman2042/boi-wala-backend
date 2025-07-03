"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = require("./app/routes/book.route");
const borrow_route_1 = require("./app/routes/borrow.route");
const globalErrorHandler_1 = __importDefault(require("./globalErrorHandler"));
const app = (0, express_1.default)();
// app.use(cors())
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("welcome to library managment");
});
app.use('/api/books', book_route_1.bookRoutes);
app.use('/api/borrow', borrow_route_1.borrowRoutes);
app.use(globalErrorHandler_1.default);
exports.default = app;
