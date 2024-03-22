import express from 'express';
import authorRouter from './author.router.js'
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import borrowingRouter from './borrowings.routes.js';
const router = express.Router();

// Mount routers
router.use('/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/authors', authorRouter);
router.use('/api/borrowings', borrowingRouter);

export default router;