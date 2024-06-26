import express from 'express';
import bookController from "../controllers/book.controller.js";
import authCtrl from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/', authCtrl.requireSignin, bookController.createBook);
router.get('/', authCtrl.requireSignin, bookController.getAllBooks);
router.get('/search/genre', bookController.searchBooksByGenre);
router.get('/search/keyword', bookController.searchBooksByKeyword);
router.get('/random', bookController.getRandomBooks);
router.get('/:id', authCtrl.requireSignin, bookController.getBookById);
router.put('/:id', authCtrl.requireSignin, bookController.updateBook);
router.delete('/:id', authCtrl.requireSignin, bookController.deleteBook);
// New routes for trending and random books


export default router;