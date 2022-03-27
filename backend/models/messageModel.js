const mongoose = require('mongoose');
const messageSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Chat"
        },
    }
    ,
    {
        timestamps: true,
    }
);
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;