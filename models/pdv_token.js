const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const PdvToken = sequelize.define(
    'PdvToken',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyId: {
        type: DataTypes.INTEGER,
        field: 'company_id',
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
    },
    {
      freezeTableName: true,
      tableName: 'pdv_tokens',
      timestamps: false,
      hooks: {
        // eslint-disable-next-line no-unused-vars
        beforeValidate: (pdvToken, options) => {
          pdvToken.token = crypto.createHash('sha1').update(Math.random().toString(36)).digest('hex');
          pdvToken.createdAt =  new Date();
        },
      },
      defaultScope: {
        attributes: [
          'id',
          'name',
          'token',
          'createdAt',
        ],
      },
    },
  );
  // eslint-disable-next-line func-names
  PdvToken.associate = function (models) {
    PdvToken.belongsTo(models.Company, {as: 'company'});
  };
  return PdvToken;
};
