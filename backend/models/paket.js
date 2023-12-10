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
    nama_produk: DataTypes.STRING,
    id_kategori: DataTypes.INTEGER,
    id_usaha: DataTypes.INTEGER,
    id_kota: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'paket',
  });
  return paket;
};