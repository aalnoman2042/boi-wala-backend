import  express  from "express"
import { borrowBook, getBorrowSummery } from "../controllers/borrow.controller"


const router = express.Router()

router.post('/', borrowBook)
router.get('/', getBorrowSummery)

export const borrowRoutes = router;