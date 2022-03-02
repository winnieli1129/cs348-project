'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const order_product = sequelize.define('order_product', {
        quantity: DataTypes.INTEGER
      });
      this.belongsToMany(models.order, {
          through: order_product,
          foreignKey: 'order_id',
          otherKey: 'product_id'
      });
    }
  }
  product.init({
    serial_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'product',
  });

  return product;
};