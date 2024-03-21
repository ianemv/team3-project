import express from 'express';
import authorRouter from './author.router.js'

const router = express.Router();

// Mount routers
router.use('/api/authors', authorRouter);

export default router;
