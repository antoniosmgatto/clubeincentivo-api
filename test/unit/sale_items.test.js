/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
const chai = require('chai');
const { SaleItem } = require('../../models');

const { expect } = chai;

describe('models/sale_item', () => {
  it('has the attributes', () => {
    const sale = SaleItem.build();
    expect(sale).to.be.a('object');
    expect(sale).to.be.instanceof(SaleItem);
    expect(sale).to.have.property('id');
    expect(sale).to.have.property('code');
    expect(sale).to.have.property('description');
    expect(sale).to.have.property('quantity');
    expect(sale).to.have.property('price');
    expect(sale).to.have.property('saleId');
  });
});
