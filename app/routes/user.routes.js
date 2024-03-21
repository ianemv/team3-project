import express from 'express'
 import userCtrl from '../controllers/user.controller.js' 
import authCtrl from '../controllers/auth.controller.js'
 const router = express.Router()
 router.route('/').post(userCtrl.create)
 router.route('/').get(userCtrl.list)
 router.route('/:userId')
.get(authCtrl.requireSignin, userCtrl.read)
.put(authCtrl.requireSignin, authCtrl.hasAuthorization, 
userCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, 
userCtrl.remove)
router.param('userId', userCtrl.userByID)
 router.route('/:userId').get(userCtrl.read)
 router.route('/:userId').put(userCtrl.update)
 router.route('/:userId').delete(userCtrl.remove)
 export default router

 //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWZjYmVhNjViZWFhNWI3MjhhYmMyMzAiLCJpYXQiOjE3MTEwNjI4NDR9.rL0VT9_Jlvl0_CQ9uuWnZhaHvnEO7N_rtAGMsEv0NLc