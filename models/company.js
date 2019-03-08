const CNPJ = require('@fnando/cnpj/dist/node');

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
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
  }, {});
  Company.associate = function (models) {
    Company.hasMany(models.Sale, { as: 'sales' });
  };
  return Company;
};
