"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = require("./app/routes/book.route");
const borrow_route_1 = require("./app/routes/borrow.route");
const globalErrorHandler_1 = __importDefault(require("./globalErrorHandler"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// app.use(cors())
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*"
}));
app.get("/", (req, res) => {
    res.send("welcome to boi-wala");
});
app.use('/books', book_route_1.bookRoutes);
app.use('/borrow', borrow_route_1.borrowRoutes);
// Not Found route 
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        error: `Route ${req.originalUrl} does not exist`,
    });
});
app.use(globalErrorHandler_1.default);
exports.default = app;
