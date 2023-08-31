"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdsType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Ad }) {
      // define association here
      this.hasMany(Ad, { foreignKey: "type_id" });
    }
  }
  AdsType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AdsType",
    }
  );
  return AdsType;
};
