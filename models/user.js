module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      Email: DataTypes.STRING,
      FullName: DataTypes.STRING,
      Password: DataTypes.STRING
    });
  
    return User;
  };