import express from 'express';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();


router.route('/').post(inquiryController.createInquiry);
router.get('/',authCtrl.requireSignin, authCtrl.getInquiries);
router.get('/:id',authCtrl.requireSignin, authCtrl.getInquiryById);
router.put('/:id',authCtrl.requireSignin, authCtrl.updateInquiry);
router.delete('/:id',authCtrl.requireSignin, authCtrl.deleteInquiry);

export default router;
