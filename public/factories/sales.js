const Faker = require('faker');
const CPF = require('@fnando/cpf');
const Sale = require('../../models');

const data = async (props = {}) => {
  const defaultProps = {
    cfeId: Faker.random.number(),
    clientDocument: CPF.generate(),
    purchaseDate: Faker.date.past(),
    total: 10.0,
  };

  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) => Sale.create(await data(props));
