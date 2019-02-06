

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('sale_items', 'price', { type: Sequelize.DECIMAL }, {}),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.removeColumn('sale_items', 'price'),
};
