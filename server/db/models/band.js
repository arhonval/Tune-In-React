"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserBand, User, SongBand }) {
      // define association here
      this.hasMany(UserBand, { foreignKey: "band_id" });
      this.belongsTo(User, { foreignKey: "admin_id" });
      this.hasMany(SongBand, { foreignKey: "band_id" });
    }
  }
  Band.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      photo: DataTypes.STRING,
      about: DataTypes.TEXT,
      telegram: DataTypes.STRING,
      insta: DataTypes.STRING,
      youtube: DataTypes.STRING,
      soundcloud: DataTypes.STRING,
      admin_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Band",
    }
  );
  return Band;
};
