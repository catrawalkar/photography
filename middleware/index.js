var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

middlewareObj.isLoggedOut = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    req.logout();
    return next();
};

module.exports = middlewareObj;
