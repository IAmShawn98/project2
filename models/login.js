module.exports = function(sequelize, DataTypes) {
  var login = sequelize.define("login", {
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
  return login;
};
