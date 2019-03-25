module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('customers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    fullName: {
      type: Sequelize.STRING,
      field: 'full_name',
    },
    document: {
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    birthday: {
      type: Sequelize.DATE,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      field: 'phone_number',
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
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('customers'),
};
