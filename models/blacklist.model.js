const mongoose = require("mongoose");

const BlackListSchema = new mongoose.Schema({
    token: String,
    expiredAt: Date
});

module.exports = mongoose.model("blacklist", BlackListSchema);