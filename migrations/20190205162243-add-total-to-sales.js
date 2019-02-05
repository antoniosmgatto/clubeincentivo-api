'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('sales', 'total', { type: Sequelize.DECIMAL }, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('sales', 'total');
  }
};
