import { model, Schema } from "mongoose";
import { Ibook } from "../interfaces/book.interface";

const bookSchema = new Schema<Ibook>({

    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true, enum: ['FICTION' , 'NON_FICTION' , 'SCIENCE' , 'HISTORY' , 'BIOGRAPHY' , 'FANTASY']},
     isbn: {type: String, required: true, unique: true},
     description: {type: String},
     copies: {
        type : Number,
         required: true,
         min:  [0 , 'enter  a positive number of your book copies']},
      available: {type: Boolean, default: true}   
},{
    timestamps: true,
    versionKey: false
})


bookSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as any;
  if (update.copies !== undefined) {
    update.available = update.copies === 0 ? false : true;
    this.setUpdate(update);
  }
  next();
});

bookSchema.pre('save', function (next) {
  if (this.copies === 0) {
    this.available = false;
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
export const Book = model<Ibook>('Book', bookSchema)