/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, _Sequelize) => queryInterface.renameColumn('sales', 'cfeId', 'cfe_id'),

  down: (queryInterface, _Sequelize) => queryInterface.renameColumn('sales', 'cfe_id', 'cfeId'),
};
