const bcrypt = require("bcrypt")
const db = require("../models");

module.exports = app => {
    app.get("/api/user/", (req, res) => {
        res.json("test");
    });
    
    // Create a new example
    app.post("/api/newUser", (req, res) => {
        db.User.findOne({
            where: {
                Email: req.body.Email
            }
        }).then(function(user) {
            if(user) {
                return done(null, false, {
                    message: 'That email is already taken'
                });
            }
            else {
                const newUser = {
                    Email: req.body.Email,
                    FullName: req.body.FullName,
                    Password: req.body.Password
                }

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.Password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.Password = hash;

                        db.User.create(newUser).then((dbUser) => {
                            res.json(dbUser);
                        }); 
                    })
                })     
            }
        })
    });
};