const User = require('../models/userModel');
const Ads = require('../models/adModel');
const generateToken = require('../utlis/generateToken');
const asyncHandler = require('express-async-handler');
const cloudinary = require("../utlis/cloudinary");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const {google}=require('googleapis')
// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth: {
//         api_key: "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"
//         //Go here: Setting -> Sender Authentication -> Single Sender Verification -> Verify an Address
//     }
// }));
const CLIENT_ID =process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const REDIRECT_URI ="https://developers.google.com/oauthplayground"
const USER_ID=process.env.USER_ID

const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN});

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.USER_ID,
//         pass: process.env.USER_PASS,
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     ignoreTLS: false,
//     secure: false,
//     auth: {
//         user: "RamannRahull@gmail.com",
//         pass: "RamannRahull@10"
//     }
// });
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
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: USER_ID,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            }
        });
        const data = transporter.sendMail({
            to: user.email,
            from: "no-reply@nitkkr-olx",
            subject: "Welcome to NIT-OLX",
            html: `You have successfully registered on our website - <br> 
            Please go through this user manual
            <a href="https://www.veed.io/view/45ce7486-5c51-4d90-b13c-5bbda423a440?sharing" target="_blank">User Manual</a>`
        }, (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
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
    // const { email, password } = req.body;

    // const user = await User.findOne({ email });
    // if (user && (await user.matchPassword(password))) {
    //     res.json(
    //         {
    //             _id: user._id,
    //             name: user.name,
    //             email: user.email,
    //             pic: user.pic,
    //             token: generateToken(user._id)
    //         }
    //     );
    // }
    // else {
    //     res.status(400);
    //     throw new Error("Invalid Email or Password");
    // }
    const { email, password, g_token } = req.body;

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
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const user = await User.findOne({ _id: id });
    console.log(user);
    if (user) {
        res.json(
            {
                _id: user._id,
                name: user.name,
                image: user.pic.url
            }
        );
    }
    else {
        res.status(400);
        throw new Error("User Not Found");
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
    if (!user) {
        return res.status(404).json("User dont Exist with this email");
    }
    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;
    await user.save();
    // const data = transporter.sendMail({
    //     to: user.email,
    //     from: "no-reply@nitkkr-olx",
    //     subject: "Password Reset Link @NIT-KKR OLX",
    //     html: `Click on this link to reset password - <br> 
    //         <a href="https://nit-olx.herokuapp.com/reset-password/${token}">Click Here</a>`
    // }, (err) => {
    //     if (err) {
    //         console.log(err);
    //         throw err;
    //     }
    // });
    // console.log(data);
    // res.status(200).json({ message: "Check your Email for password Reset Link" });
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: USER_ID,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        }
    });
    const data = transporter.sendMail({
        to: user.email,
        from: "no-reply@nitkkr-olx",
        subject: "Password Reset Link @NIT-KKR OLX",
        html: `Click on this link to reset password - <br> 
            <a href="https://nit-olx.herokuapp.com/reset-password/${token}">Click Here</a>`
    }, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
    console.log(data);
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
const contactUs = asyncHandler(async (req, res) => {
    const { name, contact, message } = req.body;
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: USER_ID,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        }
    });
    const data = transporter.sendMail({
        to: "piyush_11913097@nitkkr.ac.in",
        from: "no-reply@nitkkr-olx",
        subject: "Contact Us Form Message @NIT-OLX",
        html: `${name} <br>  ${contact} <br> <br>
            <h3>${message}</h3>`
    }, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
    res.status(200).json({ message: "Message Sent Successfully" });
});
module.exports = { registerUser, authUser, updateProfile, deleteUser, getUser, resetPassword, setNewPassword, contactUs };