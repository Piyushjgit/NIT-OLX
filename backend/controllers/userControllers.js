const User = require('../models/userModel');
const Ads = require('../models/adModel');
const generateToken = require('../utlis/generateToken');
const asyncHandler = require('express-async-handler');
const cloudinary = require("../utlis/cloudinary");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"
        //Go here: Setting -> Sender Authentication -> Single Sender Verification -> Verify an Address
    }
}));
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }
    const user = await User.create({
        name,
        email,
        password,
        pic
    });
    if (user) {
        transporter.sendMail({
            from: "no-reply@nitkkr-olx",
            to: user.email,
            subject: "Sign-Up Successfull @NIT-KKR OLX",
            html: "<h1>Welcome to NIT-KKR OLX</h1>"
        }, (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
        })
        res.status(201).json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            }
        );
    }
    else {
        res.status(400);
        throw new Error("Error Occured!");
    }
});
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            }
        );
    }
    else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
        // await Note.remove({user:req.user._id});
        await Ads.deleteMany({ seller: req.user._id });
        await User.findByIdAndRemove(req.user._id);
        // await cloudinary.v2.api.delete_resources(req.user.pic.deleteId);
        // if (user.pic.url !=="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")
        // if (req.user.pic.deleteId)
        // await cloudinary.uploader.destroy(req.user.pic.deleteId);
        res.status(201).json({ success: "Profile Deleted Successfully" });
    }
    catch
    {
        throw new Error("Sorry, Request Not Processed");
    }
});
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            pic: updatedUser.pic,
            token: generateToken(updatedUser._id),
        });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    let token = null;
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
        }
        token = buffer.toString("hex");
    })
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        res.status(422).send({ message: "User dont Exist with this email" });
    user.resetToken = token;
    // console.log(token);
    // console.log(user.resetToken);
    user.expireToken = Date.now() + 3600000;
    await user.save();
    transporter.sendMail({
        to: user.email,
        from: "no-reply@nitkkr-olx",
        subject: "Password Reset Link @NIT-KKR OLX",
        html: `Click on this link to reset password - <br> 
            <a href="http://localhost:3000/reset-password/${token}">Click Here</a>`
    }, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    })
    res.status(200).json({ message: "Check your Email for password Reset Link" });

});
const setNewPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body;
    const user = await User.findOne({ resetToken: token, expireToken: { $gt: Date.now() } });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    else {
        user.password = password;
        user.resetToken = undefined;
        user.expireToken = undefined;
        const updatedUser = await user.save();
        res.status(200).json({ message: "Password Updated Successfully , Please Login Again" });
    }

});
module.exports = { registerUser, authUser, updateProfile, deleteUser, resetPassword, setNewPassword };