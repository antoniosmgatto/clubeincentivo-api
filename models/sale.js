'use strict';

var CPF = require("cpf_cnpj").CPF;

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    cfe: {
      type: DataTypes.STRING,
    },
    clientDocument: {
      type: DataTypes.STRING,
      field: "client_document",
      validate: {
        isCpfValid() {
          if (!CPF.isValid(this.clientDocument)) {
            throw new Error("It's not a valid client document")
          }
        }
      }
    },
    purchaseDate: {
      type: DataTypes.DATE,
      field: "purchase_date"
    }
  }, {
    freezeTableName: true,
    tableName: "sales",
    version: true
  });
  Sale.associate = function(models) {
    Sale.hasMany(models.SaleItem, {as: "items"})
  };
  return Sale;
};