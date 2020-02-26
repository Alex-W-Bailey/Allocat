module.exports = function (sequelize, DataTypes) {
    var Notification = sequelize.define("Notification", {
        receivingUserId: DataTypes.INTEGER,
        senderUserId: DataTypes.INTEGER,
        projectId: DataTypes.INTEGER,
    });

    return Notification;
};