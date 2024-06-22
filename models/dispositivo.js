'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dispositivo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dispositivo.init({
    name: DataTypes.STRING,
    blocoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dispositivo',
  });
  return Dispositivo;
};