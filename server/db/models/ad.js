"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, AdsType }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(AdsType, { foreignKey: "type_id" });
    }
  }
  Ad.init(
    {
      user_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      city: DataTypes.STRING,
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Ad",
    }
  );
  return Ad;
};
