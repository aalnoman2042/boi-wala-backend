"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.bookById = exports.allBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const errorFormate_1 = require("../../errorFormate");
const console_1 = require("console");
// posting a book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json(
        // {
        //   success: false,
        //   message: "validation failed",
        //   error,
        // }
        (0, errorFormate_1.formatErrorResponse)(error));
    }
});
exports.createBook = createBook;
// getting all books
const allBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "10", } = req.query;
        console.log(req.query);
        const filtering = {};
        if (filter) {
            filtering.genre = filter;
        }
        const books = yield book_model_1.Book.find(filtering)
            .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
            .limit(Number(limit));
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        // next(error)
        res.status(500).json(
        //   {
        //   success: false,
        //   message: "Something went wrong",
        //   error,
        // }
        (0, errorFormate_1.formatErrorResponse)(error));
    }
});
exports.allBooks = allBooks;
// getting a book by ID
const bookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const oneBook = yield book_model_1.Book.findById(bookId);
        if (!oneBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: oneBook,
        });
    }
    catch (error) {
        res.status(500).json(
        //   {
        //   success: false,
        //   message: "Something went wrong",
        //   error,
        // }
        (0, errorFormate_1.formatErrorResponse)(error));
    }
});
exports.bookById = bookById;
// update a book data
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updateData = req.body;
        const book = yield book_model_1.Book.findById(bookId);
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, updateData, {
            new: true,
            runValidators: true,
        });
        // await book!.save();
        if (!bookId) {
            res.status(404).json(
            //   {
            //   success: false,
            //   message: "Book not found",
            //   data: null,
            // }
            (0, errorFormate_1.formatErrorResponse)(console_1.error));
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        res.status(500).json(
        //   {
        //   success: false,
        //   message: "Something went wrong",
        //   error,
        // }
        (0, errorFormate_1.formatErrorResponse)(error));
    }
});
exports.updateBook = updateBook;
//  delete a data
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const deletedBook = yield book_model_1.Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json(
        //  {   // success: false,
        // message: 'Something went wrong',}
        (0, errorFormate_1.formatErrorResponse)(error));
    }
});
exports.deleteBook = deleteBook;
