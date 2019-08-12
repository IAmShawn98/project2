module.exports = function(sequelize, DataTypes) {
  var logins = sequelize.define("logins", {
    team_member: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return logins;
};
