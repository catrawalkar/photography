var express = require("express");
var router = express.Router({ mergeParams: true });
var User = require("../models/user");
var passport = require("passport");
var Profile = require("../models/profile");
var middleware = require("../middleware");

//ROOT ROUTE
router.get("/", function(req, res) {
    res.render("landing");
});

router.get("/home", function(req, res) {
    User.find({}).populate("profile").populate({ path: "album", populate: { path: "photo", model: "Photo" } }).exec(function(err, allUsers) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("home", { allUsers: allUsers });
        }
    });
});

//LOGIN FORM
router.get('/login', middleware.isLoggedOut, function(req, res) {
    res.render('login');
});

//LOGIN LOGIC
router.post('/login', middleware.isLoggedOut, passport.authenticate("local", {
    successRedirect: '/home',
    failureRedirect: '/login'
}), function(req, res) {});

//LOGOUT
router.get('/logout', middleware.isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/home');
});

module.exports = router;
