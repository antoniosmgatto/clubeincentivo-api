const CPF = require('@fnando/cpf/dist/node');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const uuid = require('uuid/v1');

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      fullName: {
        type: DataTypes.STRING,
        field: 'full_name',
        allowNull: false,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isCpfValid() {
            if (!CPF.isValid(this.document)) {
              throw new Error('Document invalid');
            }
          },
        },
        unique: {
          args: true,
          msg: 'Document already in use.',
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Email invalid',
          },
          isLowercase: true,
        },
        unique: {
          args: true,
          msg: 'Email address already in use.',
        },
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        field: 'phone_number',
        allowNull: false,
        validate: {
          isValid() {
            const phoneNumber = phoneUtil.parseAndKeepRawInput(
              this.phoneNumber,
              'BR',
            );
            if (!phoneUtil.isValidNumber(phoneNumber)) {
              throw new Error('Phone number invalid');
            }
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
    },
    {
      freezeTableName: true,
      tableName: 'customers',
      hooks: {
        // eslint-disable-next-line no-unused-vars
        beforeValidate: (customer, _opts) => {
          // eslint-disable-next-line no-param-reassign
          customer.email = customer.email.toLowerCase();
        },
      },
    },
  );
  // eslint-disable-next-line no-unused-vars
  Customer.associate = function (models) {
    Customer.hasMany(models.Sale, { as: 'sales' });
    Customer.hasMany(models.Transaction, { as: 'transactions' });
  };
  return Customer;
};
