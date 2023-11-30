'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaksi.init({
    id_menu: DataTypes.STRING,
    id_user: DataTypes.STRING,
    jumlah: DataTypes.STRING,
    tanggal_acara: DataTypes.DATE,
    id_pembayaran: DataTypes.STRING,
    alamat: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};