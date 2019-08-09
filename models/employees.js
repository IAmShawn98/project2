module.exports = function(sequelize, DataTypes) {
  var employees = sequelize.define("employees", {
    team_member: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: DataTypes.STRING,
    tier_level: DataTypes.STRING,
    hours_used: DataTypes.INTEGER,
    hours_remaining: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return employees;
};
