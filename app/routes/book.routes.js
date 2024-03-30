import express from 'express';
import bookController from "../controllers/book.controller.js";
import authCtrl from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/', authCtrl.requireSignin, bookController.createBook);
router.get('/', authCtrl.requireSignin, bookController.getAllBooks);
router.get('/:id', authCtrl.requireSignin, bookController.getBookById);
router.put('/:id', authCtrl.requireSignin, bookController.updateBook);
router.delete('/:id', authCtrl.requireSignin, bookController.deleteBook);
// New routes for searching and random books
const additionalRouter = express.Router(); // Create a separate router
additionalRouter.get('/search', bookController.searchBooksByKeyword);
additionalRouter.get('/random', bookController.getRandomBooks);

// Mount the additional router at '/additional' base path
router.use('/additional', additionalRouter);


export default router;