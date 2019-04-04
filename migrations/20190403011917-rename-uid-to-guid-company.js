/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, _Sequelize) => queryInterface.renameColumn('companies', 'uid', 'guid'),

  down: (queryInterface, _Sequelize) => queryInterface.renameColumn('companies', 'guid', 'uid'),
};
