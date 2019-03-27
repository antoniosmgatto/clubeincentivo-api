module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, _Sequelize) => queryInterface.addConstraint(
    'sales',
    ['company_id', 'cfe_id'],
    { type: 'unique', name: 'company_cfe_id_unique' },
    {},
  ),

  // eslint-disable-next-line no-unused-vars
  down: (_queryInterface, _Sequelize) => {},
};
