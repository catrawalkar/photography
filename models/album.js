var mongoose = require("mongoose");

var AlbumSchema = new mongoose.Schema({
    name: String,
    created: { type: Date, default: Date.now },
    // owner: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: "User"
            // },
    photo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo"
    }]
});

module.exports = mongoose.model("Album", AlbumSchema);
