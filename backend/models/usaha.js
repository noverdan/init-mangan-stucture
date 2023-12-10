'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usaha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usaha.init({
    nama_usaha: DataTypes.STRING,
    alamat: DataTypes.STRING,
    id_seller: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usaha',
  });
  return usaha;
};