"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const router = express_1.default.Router();
router.post('/', book_controller_1.createBook);
router.get('/', book_controller_1.allBooks);
router.get('/:bookId', book_controller_1.bookById);
router.put('/:bookId', book_controller_1.updateBook);
router.delete('/:bookId', book_controller_1.deleteBook);
exports.bookRoutes = router;
