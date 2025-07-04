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
exports.getBorrowSummery = exports.borrowBook = void 0;
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
const errorFormate_1 = require("../../errorFormate");
// borrow a book
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const foundBook = yield book_model_1.Book.findById(book);
        if (!foundBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
        }
        if (foundBook.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Not enough copies available',
                data: null
            });
        }
        foundBook.copies -= quantity;
        if (foundBook.copies === 0) {
            foundBook.available = false;
        }
        yield foundBook.save();
        const borrowRecord = yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
        return res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrowRecord
        });
    }
    catch (error) {
        return res.status(500).json((0, errorFormate_1.formatErrorResponse)(error));
    }
});
exports.borrowBook = borrowBook;
//  summury of boorrow book
const getBorrowSummery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summery = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            {
                $unwind: '$bookInfo'
            },
            {
                $project: {
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    },
                    totalQuantity: 1
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            summery
        });
    }
    catch (error) {
        res.status(500).json(
        //   {
        //   success: false,
        //   message: 'Something went wrong',
        //   error
        // }
        (0, errorFormate_1.formatErrorResponse)(error));
    }
});
exports.getBorrowSummery = getBorrowSummery;
