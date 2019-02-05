'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('sale_items', 'sale_items_sale_id_fkey', {})
    return queryInterface.addConstraint('sale_items', ['sale_id'],
      {
        type: 'foreign key',
        field: "sale_items_sale_id_fkey",
        references: {
          table: "sales",
          field: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
  }
};
