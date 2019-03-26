module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'sales',
    'cashback_date',
    { type: Sequelize.DATE },
    {},
  ),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.removeColumn('sales', 'cashback_date'),
};
