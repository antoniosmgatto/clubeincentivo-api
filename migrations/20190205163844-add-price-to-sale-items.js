'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('sale_items', 'price', { type: Sequelize.DECIMAL }, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('sale_items', 'price');
  }
};
