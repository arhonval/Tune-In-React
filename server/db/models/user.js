const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      UserType,
      Follower,
      Ad,
      UserInstrument,
      UserGenre,
      Song,
      UserBand,
      Band,
      Dialog,
      Message,
    }) {
      // define association here
      this.belongsTo(UserType, { foreignKey: 'type_id' });
      this.hasMany(Follower, { foreignKey: 'user_id' });
      this.hasMany(Follower, { foreignKey: 'follow_id' });
      this.hasMany(Ad, { foreignKey: 'user_id' });
      this.hasMany(UserInstrument, { foreignKey: 'user_id' });
      this.hasMany(UserGenre, { foreignKey: 'user_id' });
      this.hasMany(Song, { foreignKey: 'user_id' });
      this.hasMany(UserBand, { foreignKey: 'user_id' });
      this.hasMany(Band, { foreignKey: 'admin_id' });
      this.hasMany(Dialog, { as: 'user_1', foreignKey: 'user1_id' });
      this.hasMany(Dialog, { as: 'user_2', foreignKey: 'user2_id' });
      this.hasMany(Message, { foreignKey: 'sender_id' });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      type_id: DataTypes.INTEGER,
      city: DataTypes.STRING,
      photo: DataTypes.STRING,
      about: DataTypes.TEXT,
      telegram: DataTypes.STRING,
      insta: DataTypes.STRING,
      youtube: DataTypes.STRING,
      soundcloud: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
