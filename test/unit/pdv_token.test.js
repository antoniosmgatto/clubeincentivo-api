/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
const chai = require('chai');
const { PdvToken } = require('../../models');

const { expect } = chai;

describe('models/pdv_token', () => {
  it('has the attributes', () => {
    const pdvToken = PdvToken.build();
    expect(pdvToken).to.be.a('object');
    expect(pdvToken).to.be.instanceof(PdvToken);
    expect(pdvToken).to.have.property('id');
    expect(pdvToken).to.have.property('name');
    expect(pdvToken).to.have.property('token');
    expect(pdvToken).to.have.property('company_id');
  });
});
