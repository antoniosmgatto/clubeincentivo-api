module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'sales',
    'on_balance',
    { type: Sequelize.BOOLEAN },
    {},
  ),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.removeColumn('sales', 'on_balance'),
};
