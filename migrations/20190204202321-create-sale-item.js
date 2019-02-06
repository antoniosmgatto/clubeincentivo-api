

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sale_items', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    code: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.FLOAT,
    },
    saleId: {
      type: Sequelize.INTEGER,
      field: 'sale_id',
      references: {
        model: 'sales',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: 'updated_at',
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('sale_items'),
};
