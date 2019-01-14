var mongoose = require("mongoose");

var PhotoSchema = new mongoose.Schema({
    url: String,
    uploaded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Photo", PhotoSchema);
