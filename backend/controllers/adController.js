const Ads = require('../models/adModel');
const User = require('../models/userModel');
const cloudinary = require("../utlis/cloudinary");
const asyncHandler = require('express-async-handler');

const allAds = asyncHandler(async (req, res) => {
    const ads = await Ads.find({ buyer: null }).populate("seller", "name pic").sort('-updatedAt');
    res.status(200).json(ads);
});
const myAds = asyncHandler(async (req, res) => {
    const ads = await Ads.find({ seller: req.user._id }).populate("seller buyer", "name pic").sort('-updatedAt');
    res.status(200).json(ads);
});
const myBuys = asyncHandler(async (req, res) => {
    const ads1 = await Ads.find({ buyer: req.user._id }).populate("seller buyer", "name pic").sort('-updatedAt');
    const ads2 = await Ads.find({ requesters: { $in: req.user._id } }).sort('-updatedAt');
    const ads = ads1.concat(ads2);
    res.status(200).json(ads);

});
const getAdById = asyncHandler(async (req, res) => {
    const ad = await Ads.findById(req.params.id).populate("seller buyer requesters", "name pic");
    if (ad) {
        res.status(200).json(ad);
    }
    else {
        res.status(404).json({ message: "ad not Found" });
    }
});

const createAd = asyncHandler(async (req, res) => {
    const { title, description, image, price } = req.body;
    if (!title || !description || !image || !price) {
        res.status(400);
        throw new Error("Please Fill All Fields");
    }
    var newAd = new Ads({ title, description, image, price, seller: req.user._id });
    newAd = await newAd.populate("seller", "name pic");
    const createdAd = await newAd.save();
    res.status(201).json(createdAd);
});
const UpdateAd = asyncHandler(async (req, res) => {
    const { title, description, image, price } = req.body;
    const ad = await Ads.findById(req.params.id);
    if (ad.seller.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You cannot perform this action");
    }
    if (ad) {
        ad.title = title;
        ad.description = description;
        ad.image = image;
        ad.price = price;
        ad.seller = req.user._id;
        ad.populate("seller", "name pic");
        var updatedAd = await ad.save();
        res.status(201).json(updatedAd);
    }
    else {
        res.status(404);
        throw new Error("Ads not found");
    }
});
const deleteAd = asyncHandler(async (req, res) => {
    const ad = await Ads.findById(req.params.id);
    if (ad.seller.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You cannot perform this action");
    }
    if (ad) {
        ad.image.map(async (pic)=>{
            const st = pic.lastIndexOf('/');
            const end = pic.lastIndexOf('.');
            const pub_id = pic.substring(st + 1, end);
            if(pic.includes('cloudinary'))
            {
                await cloudinary.uploader.destroy(pub_id);
            }
        })
        await ad.remove();
        res.status(200).json({ message: "Ad Removed" });
    }
    else {
        res.status(404);
        throw new Error("Ad not found");
    }
});
const buyRequest = asyncHandler(async (req, res) => {
    const ad = await Ads.findById(req.params.id);
    if ((req.user._id).toString() === ad.seller.toString()) {
        res.status(401);
        throw new Error("This is your own product");
    }
    if ((ad.buyer) !== null) {
        res.status(401);
        throw new Error("This Product has been sold");
    }
    if(ad)
    {
        if (ad.requesters.includes(req.user._id)) {
            await ad.updateOne({ $pull: { requesters: req.user._id } });
            var updatedAd = await ad.save();
            res.status(201).json(updatedAd);
        }
        else 
        {
            await ad.updateOne({ $push: { requesters: req.user._id } });
            var updatedAd = await ad.save();
            res.status(201).json(updatedAd);
        }
    }
    else {
        res.status(404);
        throw new Error("Ad not found");
    }
});
const confirmRequest = asyncHandler(async (req, res) => {
    const ad = await Ads.findById(req.params.aid);
    // const buyer = await User.findById(req.params.uid);
    // const seller = await User.findById(req.user._id);
    if (!ad.requesters.includes(req.params.uid)) {
        res.status(401);
        throw new Error("No Such Request Found");
    }
    if (ad) {
        // Ads.findByIdAndUpdate(req.params.id, { requester})
        await ad.updateOne({ buyer: req.params.uid });
        await ad.updateOne({ requesters: [] });
        var updatedAd = await ad.save();
        res.status(201).json(updatedAd);
    }
    else {
        res.status(404);
        throw new Error("Ad not found");
    }
});
module.exports = { allAds, createAd, getAdById, UpdateAd, deleteAd, myAds, myBuys, buyRequest, confirmRequest };