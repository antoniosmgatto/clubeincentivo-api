// eslint-disable-next-line import/no-unresolved
const CNPJ = require('@fnando/cnpj/dist/node');
const uuid = require('uuid/v1');

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
      urlLogo: {
        type: DataTypes.STRING,
        field: 'url_logo',
        allowNull: false,
        validate: {
          isUrl: {
            args: true,
            msg: 'Invalid url',
          },
        },
      },
      guid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'GUID already in use.',
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
      hooks: {
        // eslint-disable-next-line no-unused-vars
        beforeValidate: (company, options) => {
          if (company.id == null) {
            company.guid = uuid();
          }
        },
      },
      defaultScope: {
        attributes: [
          'id',
          'name',
          'document',
          'urlLogo',
          'guid',
          'createdAt',
          'updatedAt',
        ],
      },
    },
  );
  // eslint-disable-next-line func-names
  Company.associate = function (models) {
    Company.hasMany(models.Sale, { as: 'sales' });
    Company.hasMany(models.Transaction, { as: 'transactions' });
    Company.hasMany(models.PdvToken, { onDelete: 'cascade' });
  };
  return Company;
};
