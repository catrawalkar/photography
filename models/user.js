var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    email: String,
    mobile: String,
    username: String,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    album: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album"
    }],
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
