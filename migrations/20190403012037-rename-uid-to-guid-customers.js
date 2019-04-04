/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, _Sequelize) => queryInterface.renameColumn('customers', 'uid', 'guid'),

  down: (queryInterface, _Sequelize) => queryInterface.renameColumn('customers', 'guid', 'uid'),
};
