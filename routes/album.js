var express = require("express");
var router = express.Router({ mergeParams: true });
var Album = require("../models/album");
var User = require("../models/user");
var passport = require("passport");
var Profile = require("../models/profile");
var middleware = require("../middleware");

router.get('/album', middleware.isLoggedIn, function(req, res) {
    User.findById(req.user._id).populate("album").exec(function(err, foundUser) {
        if (err) {
            console.log(err);
        }
        res.render('album/', { foundUser: foundUser });
    });
});

router.get('/album/new', middleware.isLoggedIn, function(req, res) {
    res.render('album/new');
});

router.post('/album', middleware.isLoggedIn, function(req, res) {
    // req.body.album.owner = req.user._id;
    Album.create(req.body.album, function(err, newAlbum) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(newAlbum);
            req.user.album.push(newAlbum);
            req.user.save();
            console.log(req.user);
            res.redirect('/album');
        }
    });
});

router.get('/album/:id', function(req, res) {
    Album.findById(req.params.id).populate("photo").exec(function(err, foundAlbum) {
        if (err) {
            console.log(err);
        }
        res.render('album/show', { foundAlbum: foundAlbum });
    });
});

module.exports = router;
