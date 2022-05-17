const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const accessChat = asyncHandler(async (req, res) => {
    const sellerId=req.params.uid;
    const receiverId=req.user._id;
    const adId=req.params.aid;
    let room_alloted = ""
    if (sellerId > receiverId) {
        room_alloted = sellerId + " " + receiverId + " " + adId
    }
    else {
        room_alloted = receiverId + " " + sellerId + " " + adId
    }

    const room_given = await Chat.findOne({ room_id: room_alloted })
    if (room_given) {
        // console.log("heelo:", room_given)
        res.json({
            room_id: room_given.room_id,
            messages: room_given.messages,
        })
    }
    else {
        const room_to_be_alloted = await Chat.create({room_id: room_alloted});
        if (room_to_be_alloted) {
            res.json({
                room_id: room_to_be_alloted.room_id,
                messages: room_to_be_alloted.messages,
            })
        }
        else {
            throw new Error("Room not Alloted");
        }
    }
});

const updateChat = asyncHandler(async (req, res) => {
    const { room_id, messages } = req.body
    const available = await Chat.findOne({ room_id });
    if (available) {
        // available.room_id = room_id || available.room_id;
        available.messages = messages || available.messages;
        // console.log('Room-id:', available)
        const updatedChat = await available.save();
        res.json({
            room_id: updatedChat.room_id,
            messages: updatedChat.messages,
        });
    }
    else 
    {
        res.status(404).json("Chat Not Found");
    }

});

const userChat = asyncHandler(async (req, res) => {
    const user=(req.user._id);
    const chats = await Chat.find({ room_id: { $regex: user }}).sort({updatedAt:-1});
    if(chats)
    {
        res.status(201).json(chats);
    }
    else{
        res.status(404).json("Chat Not Found");
    }
});

module.exports = { updateChat, accessChat, userChat };