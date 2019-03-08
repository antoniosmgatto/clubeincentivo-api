/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
const chai = require('chai');
const { Company } = require('../../models');

const { expect } = chai;

describe('models/company', () => {
  it('has the attributes', () => {
    const company = Company.build();
    expect(company).to.be.a('object');
    expect(company).to.be.instanceof(Company);
    expect(company).to.have.property('id');
    expect(company).to.have.property('name');
    expect(company).to.have.property('document');
  });
});
