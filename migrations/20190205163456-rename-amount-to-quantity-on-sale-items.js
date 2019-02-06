

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, _Sequelize) => queryInterface.renameColumn('sale_items', 'amount', 'quantity', {}),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.renameColumn('sale_items', 'quantity', 'amount', {}),
};
