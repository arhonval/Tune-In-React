"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, GenreTag }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(GenreTag, { foreignKey: "genre_id" });
    }
  }
  UserGenre.init(
    {
      user_id: DataTypes.INTEGER,
      genre_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserGenre",
    }
  );
  return UserGenre;
};
