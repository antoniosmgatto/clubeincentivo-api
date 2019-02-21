/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.renameColumn('sales', 'cfe', 'cfeId');
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.renameColumn('sales', 'cfeId', 'cfe');
  },
};
