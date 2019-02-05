'use strict';

var CPF = require("cpf_cnpj").CPF;

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    cfe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientDocument: {
      field: "client_document",
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isCpfValid() {
          if (!CPF.isValid(this.clientDocument)) {
            throw new Error("It's not a valid client document")
          }
        }
      }
    },
    purchaseDate: {
      field: "purchase_date",
      type: DataTypes.DATE,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at"
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at"
    }
  }, {
    freezeTableName: true,
    tableName: "sales",
    version: true,
    defaultScope: {
      attributes: [ 'id', 'cfe', 'clientDocument', 'purchaseDate', 'total', 'createdAt', 'updatedAt', 'version']
    }
  });
  Sale.associate = function(models) {
    Sale.hasMany(models.SaleItem, {as: "items", onDelete: "cascade"})
  };
  return Sale;
};