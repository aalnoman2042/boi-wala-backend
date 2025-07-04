import { Request, Response } from 'express'
import { Book } from "../models/book.model";
import { formatErrorResponse } from "../../errorFormate";
import { error } from "console";

// posting a book
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    if(book.copies === 0){
      book.available = false
    }

    res.status(201).json({
      success: true,
      message: "book created successfully",
      book,
    });
  } catch (error) {
    res.status(400).json(
      // {
      //   success: false,
      //   message: "validation failed",
      //   error,
      // }
        formatErrorResponse(error)

    );
  }
};

// getting all books
export const allBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;
    console.log(req.query);

    const filtering: any = {};
    if (filter) {
      filtering.genre = filter;
    }

    const books = await Book.find(filtering)
      .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      .limit(Number(limit));

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
       books,
    });
  } catch (error) {
    // next(error)
    res.status(500).json(
    //   {
    //   success: false,
    //   message: "Something went wrong",
    //   error,
    // }
    formatErrorResponse(error)
  );
  }
};

// getting a book by ID
export const bookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const oneBook = await Book.findById(bookId);

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
  } catch (error) {
    res.status(500).json(
    //   {
    //   success: false,
    //   message: "Something went wrong",
    //   error,
    // }
    formatErrorResponse(error)
  );
  }
};

// update a book data
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updateData = req.body;

    const book = await Book.findById(bookId);

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
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
      formatErrorResponse(error)
    );
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json(
    //   {
    //   success: false,
    //   message: "Something went wrong",
    //   error,
    // }
    formatErrorResponse(error)
  );
  }
};

//  delete a data
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Book.findByIdAndDelete(bookId);

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
  } catch (error) {
    res.status(500).json(
  //  {   // success: false,
      // message: 'Something went wrong',}
      formatErrorResponse(error)
    );
  }
};
