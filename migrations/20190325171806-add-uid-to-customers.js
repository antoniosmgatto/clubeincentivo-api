module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'customers',
    'uid',
    { type: Sequelize.STRING },
    {},
  ),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.removeColumn('customers', 'uid'),
};
