module.exports = function(sequelize, DataTypes) {
    var Team = sequelize.define("Team", {
      projectId : DataTypes.INTEGER,
      teamName: DataTypes.STRING,
      teamPosition: DataTypes.INTEGER
    });
  
    return Team;
  };