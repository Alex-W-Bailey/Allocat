const db = require("../models");

module.exports = app => {
    app.get("/api/user/", (req, res) => {
        res.json("test");
    });
    
    // Create a new example
    app.post("/api/newUser", (req, res) => {
        db.User.create(req.body).then((dbUser) => {
            res.json(dbUser);
        });
    });
};