var mongoose = require("mongoose");

var ProfileSchema = new mongoose.Schema({
    first_name: String,
    middle_name: String,
    last_name: String,
    photo: String
});

module.exports = mongoose.model("Profile", ProfileSchema);
