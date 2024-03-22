// borrowingRoutes.js
import express from 'express';
import { borrowBook, returnBook, getAllBorrowings } from '../controllers/borrowings.controller.js';

const router = express.Router();

router.get('/', getAllBorrowings);
router.post('/borrow', borrowBook);
router.put('/return/:borrowingId', returnBook);

export default router;
