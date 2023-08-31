"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InstrumentTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserInstrument }) {
      // define association here
      this.hasMany(UserInstrument, { foreignKey: "instrument_id" });
    }
  }
  InstrumentTag.init(
    {
      instrument: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "InstrumentTag",
    }
  );
  return InstrumentTag;
};
