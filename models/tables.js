module.exports = function(sequelize, DataTypes) {
  var employees = sequelize.define("employees", {
    team_member: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: DataTypes.STRING,
    tier_level: DataTypes.STRING,
    hours_used: DataTypes.NUMBER,
    hours_remaining: DataTypes.NUMBER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return employees;
};

module.exports = function(sequelize, DataTypes) {
  var login = sequelize.define("login", {
    team_member: {
      type: DataTypes.STRING,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return login;
};

module.exports = function(sequelize, DataTypes) {
  var tiers = sequelize.define("tiers", {
    blue: DataTypes.NUMBER,
    green: DataTypes.NUMBER,
    purple: DataTypes.NUMBER
  });
  return tiers;
};
