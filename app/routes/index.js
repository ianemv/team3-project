import express from 'express';
import authorRouter from './author.router.js'
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import bookRouter from './book.routes.js';
import borrowingRouter from './borrowings.routes.js';
import inquiryRouter from './inquiry.routes.js';

const router = express.Router();

// Mount routers
router.use('/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/authors', authorRouter);
router.use('/api/books', bookRouter);
router.use('/api/borrowings', borrowingRouter);
router.use('/api/inquiries', borrowingRouter);

export default router;