const express = require('express');
const router = express.Router();
const { updateChat, accessChat, userChat } = require('../controllers/chatController.js');
const { protect } = require('../middlewares/authMiddleware');
router.route('/singleChats').post(protect, userChat);
router.route('/update').put(updateChat);
router.route('/:aid/:uid').post(protect, accessChat);
module.exports = router;
