module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    await queryInterface.addColumn('companies', 'uid', { type: Sequelize.STRING }, {});
    return queryInterface.addConstraint('companies', ['uid'], { type: 'unique', name: 'unique_company_uuid' }, {});
  },

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.removeColumn('companies', 'uid'),
}
