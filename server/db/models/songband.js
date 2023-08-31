"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SongBand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band }) {
      // define association here
      this.belongsTo(Band, { foreignKey: "band_id" });
    }
  }
  SongBand.init(
    {
      band_id: DataTypes.INTEGER,
      song_path: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SongBand",
    }
  );
  return SongBand;
};
