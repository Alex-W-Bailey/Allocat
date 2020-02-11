var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.status(200).end();
    });

    app.post("/api/newUser", function(req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.redirect("/");
        });
    });
}

