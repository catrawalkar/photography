var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("./models/user"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local");

app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/photography", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


var indexRoutes = require("./routes/index"),
    profileRoutes = require("./routes/profile"),
    userRoutes = require("./routes/user"),
    albumRoutes = require("./routes/album"),
    photoRoutes = require("./routes/photo");

//Passport CONFIG
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "Chinmay",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRoutes);
app.use("/", profileRoutes);
app.use("/", userRoutes);
app.use("/", albumRoutes);
app.use("/", photoRoutes);




app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});
