'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('sale_items', 'amount', 'quantity', {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('sale_items', 'quantity', 'amount', {});
  }
};
