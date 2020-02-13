module.exports = function(sequelize, DataTypes) {
    var Collaborator = sequelize.define("Collaborator", {
      userId : DataTypes.INTEGER,  
      projectId : DataTypes.INTEGER
    });
  
    return Collaborator;
  };