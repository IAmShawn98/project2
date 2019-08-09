module.exports = function(sequelize, DataTypes) {
  var tiers = sequelize.define("tiers", {
    blue: DataTypes.INTEGER,
    green: DataTypes.INTEGER,
    purple: DataTypes.INTEGER
  });
  return tiers;
};
