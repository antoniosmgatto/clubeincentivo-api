

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    cfe: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    clientDocument: {
      type: Sequelize.STRING,
      field: 'client_document',
    },
    purchaseDate: {
      type: Sequelize.DATE,
      field: 'purchase_date',
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
    version: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('sales'),
};
