var express = require("express");
var router = express.Router({ mergeParams: true });
var User = require("../models/user");
var passport = require("passport");
var Profile = require("../models/profile");
var middleware = require("../middleware");

//REGISTER FORM
router.get('/register', middleware.isLoggedOut, function(req, res) {
    res.render('user/new');
});



//REGISTER LOGIC
router.post('/register', middleware.isLoggedOut, function(req, res) {
    User.register(new User({ username: req.body.username, email: req.body.email, mobile: req.body.mobile }), req.body.password, function(err, newUser) {
        if (err) {
            console.log(err);
            return res.redirect('back');
        }
        passport.authenticate("local")(req, res, function() {
            //     req.flash("success", "Welcome to YelpCamp, " + user.username + ".")
            //     res.redirect('/campgrounds');
            // });
            Profile.create({}, function(err, newProfile) {
                if (err) {
                    console.log(err);
                }
                console.log(newProfile);
                newUser.profile = newProfile._id;
                newUser.save();
            });
            console.log(newUser);
            res.redirect('/profile/edit');
        });
    });
});

router.get('/account', middleware.isLoggedIn, function(req, res) {
    res.render('user/show');
});

module.exports = router;
