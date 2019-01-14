var express = require("express");
var router = express.Router({ mergeParams: true });
var Album = require("../models/album");
var User = require("../models/user");
var Photo = require("../models/photo");
var passport = require("passport");
var Profile = require("../models/profile");
var middleware = require("../middleware");

router.get('/album/:id/photo/new', middleware.isLoggedIn, function(req, res) {
    Album.findById(req.params.id, function(err, foundAlbum) {
        if (err) {
            console.log(err);
        }
        res.render('photo/new', { foundAlbum: foundAlbum });
    });
});

router.post('/album/:id/photo', middleware.isLoggedIn, function(req, res) {
    Album.findById(req.params.id, function(err, foundAlbum) {
        if (err) {
            console.log(err);
        }
        Photo.create(req.body.photo, function(err, newPhoto) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(newPhoto);
                foundAlbum.photo.push(newPhoto._id)
                foundAlbum.save()
                console.log(foundAlbum);
                res.redirect('/album/' + req.params.id);
            }
        })
    });
});

module.exports = router;
