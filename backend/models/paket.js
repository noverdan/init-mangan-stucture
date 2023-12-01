'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  paket.init({
    nama_paket: DataTypes.STRING,
    id_kategori: DataTypes.STRING,
    id_ulasan: DataTypes.STRING,
    id_seller: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'paket',
  });
  return paket;
};