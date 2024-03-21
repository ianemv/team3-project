import express from 'express';
import authorController from '../controllers/author.controller.js';

const router = express.Router();

// Routes for authors
router.post('/', authorController.createAuthor);
router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);


export default router;
