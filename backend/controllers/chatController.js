const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    }).populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });
    console.log(isChat);
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});
const fetchChats = asyncHandler(async (req, res) => {
    try {
         var chats= await Chat.find({
            users: { $elemMatch: { $eq: req.user._id }} 
        }).populate("users",'-password')
        .populate("latestMessage")
        .sort({updatedAt:-1});
        
        chats = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name pic email",
        });
        res.status(200).json(chats);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const createChat = asyncHandler(async (req, res) => {
    
});
const deleteChat = asyncHandler(async (req, res) => {

});
module.exports = { fetchChats, createChat, accessChat, deleteChat };