import express from 'express'
import { allBooks, bookById, createBook, deleteBook, updateBook } from '../controllers/book.controller'


const router = express.Router()

router.post('/', createBook)
router.get('/', allBooks)
router.get('/:bookId', bookById)
router.put('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)

export const bookRoutes = router;