// eslint-disable-next-line import/no-unresolved
const CNPJ = require('@fnando/cnpj/dist/node');

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'Company',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isCnpjValid() {
            if (!CNPJ.isValid(this.document)) {
              throw new Error("It's not a valid document");
            }
          },
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      freezeTableName: true,
      tableName: 'companies',
      version: false,
      defaultScope: {
        attributes: [
          'id',
          'name',
          'document',
          'createdAt',
          'updatedAt',
        ],
      },
    },
  );
  // eslint-disable-next-line func-names
  Company.associate = function (models) {
    Company.hasMany(models.Sale, { as: 'sales' });
    Company.hasMany(models.PdvToken, { onDelete: 'cascade' });
  };
  return Company;
};
