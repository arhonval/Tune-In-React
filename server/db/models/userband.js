"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Band }) {
      // define association here
      this.belongsTo(Band, { foreignKey: "band_id" });
      this.belongsTo(User, { foreignKey: "user_id" });
    }
  }
  UserBand.init(
    {
      band_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserBand",
    }
  );
  return UserBand;
};
