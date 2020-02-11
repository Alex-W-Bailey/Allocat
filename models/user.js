var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      password: DataTypes.STRING
    });

    User.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
    };

    User.hook("beforeCreate", function(user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    });
  
    return User;
  };