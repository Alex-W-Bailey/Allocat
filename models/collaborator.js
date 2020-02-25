module.exports = function(sequelize, DataTypes) {
    var Collaborator = sequelize.define("Collaborator", {
      userId : DataTypes.INTEGER,  
      projectId : DataTypes.INTEGER,
      teamName: DataTypes.STRING
    });
  
    return Collaborator;
  };