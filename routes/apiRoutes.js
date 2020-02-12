var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    //GET
    app.get("/api/allProjects", (req, res ) => {
        var userId = req.user.id;
        db.Collaborator.findAll({
            where: {
                userId: userId
            }
        }).then((dbUsers) => {
            res.json(dbUsers);
        })
    }); 

    //POST
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        res.status(200).end();
    });

    app.post("/api/newUser", (req, res) => {
        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then((users) => {
            if(users){
                console.log("email is already taken...");
                res.send("email is already taken");
            }
            else{
                db.User.create({
                    email: req.body.email,
                    fullName: req.body.fullName,
                    password: req.body.password
                }).then(() => {
                    res.status(200).end();
                });
            }
        })
    });

    app.post("/api/newProject", (req, res) => {
        db.Project.findOne({
            where: {
                projectName: req.body.projectName
            }
        }).then((projectsFound) => {
            if(projectsFound){
                console.log("Project name already in use");
                res.send("err");
            }
            else {
                db.Project.create({
                    projectName: req.body.projectName,
                    projectDescription: req.body.projectDescription,
                    dueDate: req.body.dueDate
                }).then(() => {
                    res.status(200).end();
                });
            }
        })
    });
}

