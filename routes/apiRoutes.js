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
        }).then((dbProjectCollab) => {
            res.json(dbProjectCollab);
        });
    }); 

    app.get("/api/project/:projectId", (req, res) => {
        db.Project.findOne({
            where: {
                id: req.params.projectId
            }
        }).then((dbProjectInfo) => {
            res.json(dbProjectInfo);
        });
    });

    app.get("/api/project/name/:projectName", (req, res) => {
        db.Project.findOne({
            where: {
                projectName: req.params.projectName
            }
        }).then((dbProjectInfo) => {
            res.json(dbProjectInfo);
        });
    })

    app.get("/api/allUsers", (req, res) => {
        db.User.findAll({})
        .then((dbUsers) => {
            res.json(dbUsers)
        })
    })

    app.get("/api/user/:userEmail", (req, res) => {
        db.User.findOne({
            where: {
                email: req.params.userEmail
            }
        }).then((dbUser) => {
            res.json(dbUser);
        });
    });

    app.get("/api/allTeams/:projectId", (req, res) => {
        db.Team.findAll({
            where: {
                projectId: req.params.projectId
            }
        }).then((dbTeams) => {
            res.json(dbTeams);
        })
    })

    app.get("/api/allTasks/:projectId", (req, res) => {
        db.Task.findAll({
            where: {
                projectId: req.params.projectId
            }
        }).then((dbTasks) => {
            res.json(dbTasks);
        });
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
        });
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
        });
    });

    app.post("/api/newTeam", (req, res) => {
        db.Project.findOne({
            where: {
                projectName: req.body.projectName
            }
        }).then((project) => {
            var newTeam = {
                projectId: project.id,
                teamName: req.body.teamName,
                teamPosition: req.body.teamPosition
            }

            db.Team.create(newTeam).then(() => {
                res.status(200).end();
            });

        });
    });

    app.post("/api/projectCreator", (req, res) => {
        var userId = req.user.id;
        console.log("userId: " + req.user);

        db.Project.findOne({
            where: {
                projectName: req.body.projectName
            }
        }).then((project) => {
            db.Collaborator.create({
                userId: userId,
                projectId: project.id,
            }).then(() => {
                res.status(200).end();
            });
        });
    });

    app.post("/api/newCollaborator/:userEmail/:projectName", (req, res) => {
        db.User.findOne({
            where: {
                email: req.params.userEmail
            }
        }).then((userFound) => {
            db.Project.findOne({
                where: {
                    projectName: req.params.projectName
                }
            }).then((projectFound) => {
                db.Collaborator.create({
                  userId: userFound.id,
                  projectId: projectFound.id  
                }).then(() => {
                    res.status(200).end();
                });
            });
        });
    });

    app.post("/api/newTask", (req, res) => {
        db.Task.create({
            userId: req.user.id,
            projectId: req.body.projectId,
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
            taskDueDate: req.body.dueDate,
            taskPriority: req.body.taskPriority,
            taskTeam: req.body.taskTeam,
            taskStatus: req.body.taskStatus
        }).then(() => {
            res.status(200).end();
        });
    });
}

