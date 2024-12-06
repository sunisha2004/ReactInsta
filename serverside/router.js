import { Router } from "express";
import Auth from './authentication/auth.js';

import * as rh from './reqhandler.js'

const router=Router();
router.route('/adduser').post(rh.addUser)
router.route('/login').post(rh.login)
router.route('/verify').post(rh.verifyEmail)
router.route("/display").get(Auth,rh.display)
router.route("/profile").get(Auth,rh.profile);
router.route('/adduserData').post(Auth,rh.addUserData)
router.route('/edituserData').put(Auth,rh.editUserData)
// router.route('/otpcheck').post(rh.verifyotp)
// router.route('/passcheck').post(rh.updatepass)

export default router