// eslint-disable-next-line import/no-unresolved
const CNPJ = require('@fnando/cnpj/dist/node');
const crypto = require('crypto');

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
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'UID already in use.',
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
          company.uid = crypto
            .createHash('sha1')
            .update(Math.random().toString(36))
            .digest('hex');
        },
      },
      defaultScope: {
        attributes: [
          'id',
          'name',
          'document',
          'urlLogo',
          'uid',
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
