module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('sales', 'company_id', Sequelize.INTEGER).then(() => {
      queryInterface.changeColumn('sales', 'company_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }).then(() => {
        queryInterface.addConstraint('sales', ['company_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'companies',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        });
      });
    });
  },
};
