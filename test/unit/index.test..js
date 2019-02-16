/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */

const chai = require('chai');

const { Sale, SaleItem } = require('../../models');
// let chai = require('chai');
// let chainHttp = require('chai-http');

const { expect } = chai;

// chai.use(chainHttp);

describe('models/index', () => {
  it('returns the Sale model', () => {
    expect(Sale).to.be.ok;
  });

  it('returns the SaleItem model', () => {
    expect(SaleItem).to.be.ok;
  });
});
