const express = require('express');
const router=express.Router();
const { registerUser, authUser, updateProfile, deleteUser} = require('../controllers/userControllers');
const {protect}=require('../middlewares/authMiddleware');
router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').post(protect, updateProfile);
router.route('/delete').delete(protect, deleteUser);
module.exports=router;