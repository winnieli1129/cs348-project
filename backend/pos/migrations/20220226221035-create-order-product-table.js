'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('order_products', {
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        reference: {
          model: 'product',
          key: 'id',
          as: 'product_id'
        },
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        reference: {
          model: 'order',
          key: 'id',
          as: 'order_id'
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('order_product');
  }
};
