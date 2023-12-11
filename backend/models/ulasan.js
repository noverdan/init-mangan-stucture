'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ulasan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ulasan.init({
    id_user: DataTypes.INTEGER,
    ulasan: DataTypes.STRING,
    id_paket: DataTypes.INTEGER,
    tanggal: DataTypes.DATE,
    bintang: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ulasan',
  });
  return ulasan;
};