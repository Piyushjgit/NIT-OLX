const mongoose = require('mongoose');
const chatSchema = mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true
        },
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Message"
            // required: true
        },
        users:[ {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"User"
        }],
    }
    ,
    {
        timestamps: true,
    }
);
const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;