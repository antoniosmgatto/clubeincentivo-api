/* eslint-disable no-undef */
const saleFactory = require('../factories/sales');

// let Sale = require('../../models');
// let chai = require('chai');
// let chainHttp = require('chai-http');
// let should = chai.should();

// chai.use(chainHttp);

describe('Sales', () => {
  beforeEach((done) => {
    // Sale.destroy({ truncate: true });
    console.log('Cleanup database');
  });

  it('sould do something', async () => {
    console.log('Start process');
    const sale = await saleFactory();
  });
});