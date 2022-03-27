const express = require('express');
const router = express.Router();
const { allAds, createAd, getAdById, UpdateAd, deleteAd, myAds, myBuys, buyRequest, confirmRequest } = require('../controllers/adController');
const { protect } = require('../middlewares/authMiddleware');
router.route('/').get(allAds);
router.route('/myads').get(protect, myAds);
router.route('/mybuys').get(protect, myBuys);
router.route('/create').post(protect, createAd);
router.route('/:id').get(getAdById).put(protect, UpdateAd).delete(protect, deleteAd);
router.route('/:id/buyrequest').post(protect, buyRequest);
router.route('/:aid/:uid/confirmrequest').post(protect, confirmRequest);
module.exports = router;

//create , delete,update,
//all ads,myads