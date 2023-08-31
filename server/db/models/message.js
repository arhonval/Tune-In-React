"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Dialog, User }) {
      // define association here
      this.belongsTo(Dialog, { foreignKey: "dialog_id" });
      this.belongsTo(User, { foreignKey: "sender_id" });
    }
  }
  Message.init(
    {
      dialog_id: DataTypes.INTEGER,
      body: DataTypes.TEXT,
      sender_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
