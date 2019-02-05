'use strict';

var Sale = require("../models").Sale;
var SaleItem = require("../models").SaleItem;
var Faker = require("faker");
var CPF = require("cpf_cnpj").CPF;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var sales = []
    var sale_items = []
    for (var i=1;i<=100;i++) {
      sales.push({
        cfe: Faker.random.number(),
        client_document: CPF.generate(),
        purchase_date: Faker.date.past(),
        total: 0.0,
        created_at: new Date(),
        updated_at: new Date(),
        version: 0
      })
      for (var j=1;j<=3;j++) {
        sale_items.push({
          code: "001",
          description: "Item 1",
          quantity: 1.0,
          price: 10.0,
          sale_id: i,
          created_at: new Date(),
          updated_at: new Date()
        })
      }
    }

    await queryInterface.bulkInsert('sales', sales, {});

    return queryInterface.bulkInsert('sale_items', sale_items, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
    await queryInterface.bulkDelete('sale_items', null, {});
  }
};
