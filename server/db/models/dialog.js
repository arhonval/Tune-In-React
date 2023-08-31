"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dialog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Message }) {
      // define association here
      this.belongsTo(User, {as:"user_1", foreignKey: "user1_id" });
      this.belongsTo(User, {as:"user_2", foreignKey: "user2_id" });
      this.hasMany(Message, { foreignKey: "dialog_id" });
    }
  }
  Dialog.init(
    {
      user1_id: DataTypes.INTEGER,
      user2_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Dialog",
    }
  );
  return Dialog;
};
