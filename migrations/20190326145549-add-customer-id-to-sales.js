module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'sales',
      'customer_id',
      { type: Sequelize.INTEGER },
      {},
    );
    return queryInterface.addConstraint('sales', ['customer_id'], {
      type: 'foreign key',
      field: 'sales_customer_id_fkey',
      references: {
        table: 'customers',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => {
    queryInterface.removeColumn('sales', 'customer_id');
  },
};
