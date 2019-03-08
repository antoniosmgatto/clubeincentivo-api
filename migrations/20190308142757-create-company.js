

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('companies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    document: {
      type: Sequelize.STRING,
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
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('companies'),
};
