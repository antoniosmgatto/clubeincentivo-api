

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, _Sequelize) => queryInterface.removeColumn('sales', 'client_document'),

  // eslint-disable-next-line no-unused-vars
  down: (_queryInterface, _Sequelize) => {},
};
