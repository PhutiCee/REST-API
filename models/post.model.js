const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "published",
    },
    bannerImage: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Post", PostSchema);