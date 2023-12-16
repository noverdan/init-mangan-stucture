'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.usaha, { foreignKey: 'id_seller' });
      user.hasMany(models.ulasan, { foreignKey: 'id_user' });
    }
  }
  user.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    alamat: DataTypes.STRING,
    password: DataTypes.STRING,
    id_level: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};