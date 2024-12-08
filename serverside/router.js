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
router.route('/deleteUser').delete(Auth,rh.deleteUser)
router.route('/addPost').post(Auth,rh.addPost)
router.route('/getPosts').get(Auth, rh.getPosts)
router.route('/getPost/:id').get(Auth, rh.getPost)
router.route('/getAllPosts').get(Auth, rh.getAllPosts)
router.route('/deletePost/:id').delete(Auth, rh.deletePost)


// router.route('/otpcheck').post(rh.verifyotp)
// router.route('/passcheck').post(rh.updatepass)

export default router