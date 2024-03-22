import express from 'express';
import authorController from '../controllers/author.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();
console.log(authCtrl.requireSignin, 'authore')
// Routes for authors
router.route('/').post(authCtrl.requireSignin, authorController.createAuthor);
router.route('/').get(authCtrl.requireSignin, authorController.getAllAuthors);
router.route("/:id")
		.get(authCtrl.requireSignin, authorController.getAuthorById)
		.put(authCtrl.requireSignin, authorController.updateAuthor)
		.delete(authCtrl.requireSignin, authorController.deleteAuthor);

export default router;
