

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    tag: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.DECIMAL,
    },
    guid: {
      type: Sequelize.UUID,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: Sequelize.DATE,
    },
    transactionable: {
      type: Sequelize.STRING,
    },
    transactionableId: {
      type: Sequelize.STRING,
      field: 'transactionable_id',
    },
    customerId: {
      type: Sequelize.INTEGER,
      field: 'customer_id',
      references: {
        model: 'customers',
        key: 'id',
      },
    },
    companyId: {
      type: Sequelize.INTEGER,
      field: 'company_id',
      references: {
        model: 'companies',
        key: 'id',
      },
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('transactions'),
};
