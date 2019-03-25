/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
const chai = require('chai');
const { Customer } = require('../../models');

const { expect } = chai;

describe('models/customer', () => {
  it('has the attributes', () => {
    const customer = Customer.build();
    expect(customer).to.be.a('object');
    expect(customer).to.be.instanceof(customer);
    expect(customer).to.have.property('id');
    expect(customer).to.have.property('fullName');
    expect(customer).to.have.property('document');
    expect(customer).to.have.property('email');
    expect(customer).to.have.property('phoneNumber');
    expect(customer).to.have.property('birthday');
  });
});
