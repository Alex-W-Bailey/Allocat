var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
    //GET
    app.get("/api/logout", (req, res) => {
        req.logout()
        res.redirect('/')
    })
   
    app.get("/api/allProjects", (req, res) => {
        var userId = req.user.id;
        db.Collaborator.findAll({
            where: {
                userId: userId
            }
        }).then((dbProjectCollab) => {
            res.json(dbProjectCollab);
        });
    });

    app.get("/api/findCurrentUser", (req, res) => {
        var currentUser = req.user.id;
        db.User.findOne({
            where: {
                id: currentUser
            }
        }).then((dbUser) => {
            res.json(dbUser);
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
    });

    app.get("/api/allUsers", (req, res) => {
        db.User.findAll({})
            .then((dbUsers) => {
                res.json(dbUsers)
            });
    });

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
        });
    });

    app.get("/api/findUser/:userId", (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.userId
            }
        }).then((dbUsers) => {
            res.json(dbUsers);
        })
    });

    app.get("/api/allCollaborators/:projectId", (req, res) => {
        db.Collaborator.findAll({
            where: {
                projectId: req.params.projectId
            }
        }).then((dbCollab) => {
            res.json(dbCollab);
        });
    });

    app.get("/api/allTasks/:projectId", (req, res) => {
        db.Task.findAll({
            where: {
                projectId: req.params.projectId
            }
        }).then((dbTasks) => {
            res.json(dbTasks);
        });
    });

    app.get("/api/userTasks/:projectId", (req, res) => {
        db.Task.findAll({
            where: {
                userId: req.user.id,
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
            if (users) {
                console.log("email is already taken...");
                res.send("email is already taken");
            }
            else {
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
            if (projectsFound) {
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

    app.post("/api/addTeamToProject", (req, res) => {
        db.Team.create({
            projectId: req.body.projectId,
            teamName: req.body.teamName,
        }).then(() => {
            res.status(200).end();
        })
    })

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

    //Update
    app.put("/api/claimTask/:taskId", (req, res) => {
        var userID = req.user.id;

        db.Task.update(
            { userId: userID },
            {
                where:
                {
                    id: req.params.taskId
                }
            }
        ).then((rowsUpdated) => {
            db.Task.update(
                { taskStatus: "Working On" },
                {
                    where:
                    {
                        id: req.params.taskId
                    }
                }
            ).then((rowsUpdated) => {
                res.json(rowsUpdated)
            });
        });
    });

    app.put("/api/unclaimTask/:taskId", (req, res) => {
        db.Task.update(
            {userId: null},
            {where: 
                {
                    id: req.params.taskId
                }
            }
        ).then((rowsUpdated) => {
            db.Task.update(
                {taskStatus: "Unassigned"},
                {where: 
                    {
                        id: req.params.taskId
                    }
                }
            ).then((rowsUpdated) => {
                res.json(rowsUpdated);
            });    
        });  
    });

    app.put("/api/updateStatus/:taskId", (req, res) => {
        db.Task.update(
            {taskStatus: req.body.taskStatus},
            {where: 
                {
                    id: req.params.taskId
                }
            }
        ).then((rowsUpdated) => {
            res.json(rowsUpdated);
        });  
    });

    app.put("/api/newAssignTeam/:projectId/:userId/:teamName", (req, res) => {
        db.Collaborator.update(
            { teamName: req.params.teamName },
            {
                where: [
                    { userId: req.params.userId },
                    { projectId: req.params.projectId }
                ]
            }
        ).then((rowsUpdated) => {
            res.json(rowsUpdated)
        });

    });

    //DESTROY
    app.delete("/api/deleteTask/:taskId", (req, res) => {
       db.Task.destroy({
           where: {
               id: req.params.taskId
           }
       }).then((deletedTask) => {
           res.json(deletedTask)
       });
    });
}

