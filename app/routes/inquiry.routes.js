import express from 'express';
import authCtrl from '../controllers/auth.controller.js';
import inquiryController from '../controllers/inquiry.controller.js';

const router = express.Router();

router.route('/').post(inquiryController.createInquiry);
router.get('/',authCtrl.requireSignin, inquiryController.getInquiries);
router.get('/:id',authCtrl.requireSignin, inquiryController.getInquiryById);
router.put('/:id',authCtrl.requireSignin, inquiryController.updateInquiry);
router.delete('/:id',authCtrl.requireSignin, inquiryController.deleteInquiry);

export default router;