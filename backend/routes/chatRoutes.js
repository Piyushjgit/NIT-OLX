const express = require('express');
const router = express.Router();
const { fetchChats, createChat, accessChat, deleteChat  } = require('../controllers/chatController.js');
const { protect } = require('../middlewares/authMiddleware');
router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
// router.route('/create').post(protect, createChat);
module.exports=router;