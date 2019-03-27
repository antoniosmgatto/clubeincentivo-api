module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'companies',
    'url_logo',
    { type: Sequelize.STRING },
    {},
  ),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.removeColumn('companies', 'url_logo'),
};
