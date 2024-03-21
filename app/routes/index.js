import express from 'express';
import authorRouter from './author.router.js'
import authRouter from './auth.routes.js';
const router = express.Router();

// Mount routers
router.use('/api/authors', authorRouter);
router.use('/auth', authRouter);

export default router;