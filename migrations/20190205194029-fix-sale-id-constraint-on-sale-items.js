

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, _Sequelize) => {
    queryInterface.removeConstraint('sale_items', 'sale_items_sale_id_fkey', {});
    return queryInterface.addConstraint('sale_items', ['sale_id'],
      {
        type: 'foreign key',
        field: 'sale_items_sale_id_fkey',
        references: {
          table: 'sales',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
  },

  // eslint-disable-next-line no-unused-vars
  down: (_queryInterface, _Sequelize) => {
  },
};
