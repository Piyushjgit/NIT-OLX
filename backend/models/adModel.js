const mongoose = require("mongoose");
const AdsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: [{ type: String, required: true }],
        price: { type: Number, required: true },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        requesters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]

    },
    { timestamps: true }
);
module.exports = mongoose.model("Ads", AdsSchema);