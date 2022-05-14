const mongoose = require('mongoose');
const chatSchema = mongoose.Schema(
    {
        room_id: {
            type: String
        },
        messages: [{ type: String }]
    }
    ,
    {
        timestamps: true,
    }
);
const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;