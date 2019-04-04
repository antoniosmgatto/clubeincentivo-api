module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('sales', 'guid', { type: Sequelize.STRING }, {});
    return queryInterface.addConstraint(
      'sales',
      ['guid'],
      { type: 'unique', name: 'unique_company_guid' },
      {},
    );
  },

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.removeColumn('sales', 'guid'),
};
