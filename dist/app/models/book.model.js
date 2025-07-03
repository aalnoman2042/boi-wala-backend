"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true, enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'] },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
        type: Number,
        required: true,
        min: [0, 'enter  a positive number of your book copies']
    },
    available: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
});
bookSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.copies !== undefined) {
        update.available = update.copies === 0 ? false : true;
        this.setUpdate(update);
    }
    next();
});
// bookSchema.pre('createCollection', function (next) {
//   const update = this.getUpdate() as any;
//   if (update.copies !== undefined) {
//     update.available = update.copies === 0 ? false : true;
//     this.setUpdate(update);
//   }
//   next();
// });
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
