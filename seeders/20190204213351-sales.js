const Faker = require('faker');
const { CPF } = require('cpf_cnpj');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, _Sequelize) => {
    const sales = [];
    const saleItems = [];
    for (let i = 1; i <= 100; i += 1) {
      sales.push({
        cfe: Faker.random.number(),
        client_document: CPF.generate(),
        purchase_date: Faker.date.past(),
        total: 0.0,
        created_at: new Date(),
        updated_at: new Date(),
        version: 0,
      });
      for (let j = 1; j <= 3; j += 1) {
        saleItems.push({
          code: '001',
          description: 'Item 1',
          quantity: 1.0,
          price: 10.0,
          sale_id: i,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('sales', sales, {});

    return queryInterface.bulkInsert('sale_items', saleItems, {});
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
    await queryInterface.bulkDelete('sale_items', null, {});
  },
};
