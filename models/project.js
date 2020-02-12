module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
      projectName: DataTypes.STRING,
      projectDescription: DataTypes.STRING,
      dueDate: DataTypes.STRING
    });
  
    return Project;
  };