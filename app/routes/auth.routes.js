import express from 'express'
import authCtrl from '../controllers/auth.controller.js'
const router = express.Router()

router.route('/auth/signin').get(authCtrl.signin)
//TODO
// router.route('/auth/signup').post(authCtrl.signup)
// router.route('/auth/signout').get(authCtrl.signout)

export default router