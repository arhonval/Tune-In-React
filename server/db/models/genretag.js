"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GenreTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserGenre }) {
      // define association here
      this.hasMany(UserGenre, { foreignKey: "genre_id" });
    }
  }
  GenreTag.init(
    {
      genre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GenreTag",
    }
  );
  return GenreTag;
};
