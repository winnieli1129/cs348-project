'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total_price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'store',
          key: 'id',
          as: 'store_id'
        },
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        reference: {
          model: 'customer',
          key: 'id',
          as: 'customer_id'
        },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};