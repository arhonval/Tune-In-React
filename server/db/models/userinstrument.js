"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserInstrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, InstrumentTag }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(InstrumentTag, { foreignKey: "instrument_id" });
    }
  }
  UserInstrument.init(
    {
      user_id: DataTypes.INTEGER,
      instrument_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserInstrument",
    }
  );
  return UserInstrument;
};
