import { CallbackError, model, Schema, Types } from "mongoose";
import { ref } from "process";
import { Book } from "./book.model";
import { formatErrorResponse } from "../../errorFormate";


const borrowSchema = new Schema (
    {
        book: {
            type: Types.ObjectId,
            ref: 'Book',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        dueDate: {
            type: Date,
            required: true,
        },

    },
    {
        timestamps: true,
        versionKey: false
    }
)

borrowSchema.post('save', async function (doc, next) {
  try {
    const borrowedBook = await Book.findById(doc.book);
    if (borrowedBook) {
      borrowedBook.copies -= doc.quantity;

      if (borrowedBook.copies <= 0) {
        borrowedBook.available = false;
      }

      await borrowedBook.save();
    }

    next();
  } catch (error) {
next(error as CallbackError);
  }
});


export const Borrow = model('Borrow', borrowSchema)