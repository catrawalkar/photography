var express = require("express");
var router = express.Router({ mergeParams: true });
var User = require("../models/user");
var Profile = require("../models/profile");
var middleware = require("../middleware");

router.get('/profile/edit', middleware.isLoggedIn, function(req, res) {
    res.render('profile/edit');
});

router.post('/:id/profile', middleware.isLoggedIn, function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            console.log(err);
        }
        else {
            Profile.create(req.body.profile, function(err, createdProfile) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(createdProfile);
                    foundUser.profile = createdProfile._id;
                    foundUser.save();
                    console.log(foundUser);
                    res.redirect('/home');
                }
            });
        }
    });
});

module.exports = router;
