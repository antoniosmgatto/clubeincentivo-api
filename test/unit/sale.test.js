/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
const chai = require('chai');
const { Sale } = require('../../models');

const { expect } = chai;

describe('models/sales', () => {
  it('has the attributes', () => {
    const sale = Sale.build();
    expect(sale).to.be.a('object');
    expect(sale).to.be.instanceof(Sale);
    expect(sale).to.have.property('id');
    expect(sale).to.have.property('cfeId');
    expect(sale).to.have.property('clientDocument');
    expect(sale).to.have.property('purchaseDate');
    expect(sale).to.have.property('total');
  });
});
