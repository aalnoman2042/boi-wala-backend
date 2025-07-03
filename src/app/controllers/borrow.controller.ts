import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { title } from "process";
import { formatErrorResponse } from "../../errorFormate";

// borrow a book
export const borrowBook =  async (req: Request, res: Response) =>{

    try {
        const {book, quantity, dueDate} = req.body

        const foundBook = await Book.findById(book)
// console.log(foundBook);


        if  (!foundBook){
            res.status(404).json(
                {
                    success: false,
                    message: 'book not found',
                    data : null
                }
            )
        };

        if(foundBook!.copies < quantity){
            res.status(400).json({
                success: false,
                message: 'not enough copies avaiable',
                data: null
            })
        };

        foundBook!.copies -= quantity;
        if(foundBook?.copies === 0){
            foundBook.available = false
        }
        await foundBook?.save()

        const borrowRecord = await Borrow.create({book, quantity, dueDate})

        res.status(201).json({
            success: true,
            message: 'book borrowed succefully',
            data: borrowRecord
        })
    } catch (error) {
        res.status(500).json(
      //     {
      // success: false,
      // message: 'Something went wrong',
      // error }
      formatErrorResponse(error)
    );
    }
}


//  summury of boorrow book
export const getBorrowSummery = async (req: Request, res: Response) => {
  try {
    const summery = await Borrow.aggregate([
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
      data: summery
    });
  } catch (error) {
    
     res.status(500).json(
    //   {

    //   success: false,
    //   message: 'Something went wrong',
    //   error
    // }
    formatErrorResponse(error)
  );
  }
};
