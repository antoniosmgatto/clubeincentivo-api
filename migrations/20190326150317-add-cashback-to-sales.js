module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'sales',
    'cashback',
    { type: Sequelize.DECIMAL },
    {},
  ),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.removeColumn('sales', 'cashback'),
};
