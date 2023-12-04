'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_pesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  detail_pesanan.init({
    tanggal_pembayaran: DataTypes.DATE,
    tanggal_pemesanan: DataTypes.DATE,
    id_transaksi: DataTypes.INTEGER,
    total_harga: DataTypes.STRING,
    id_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detail_pesanan',
  });
  return detail_pesanan;
};