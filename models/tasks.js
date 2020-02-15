module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
        userId: DataTypes.INTEGER,
        taskName: DataTypes.STRING,
        taskDescription: DataTypes.STRING,
        taskDueDate: DataTypes.STRING,
        taskPriority: DataTypes.STRING,
        taskStatus: DataTypes.STRING
    });

    return Task;
};