/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */

const chai = require('chai');
const chainHttp = require('chai-http');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
const app = require('../../app');
const { Customer } = require('../../models');

chai.use(chainHttp);

const payload = {
  fullName: 'Fulano',
  document: '210.698.000-07',
  email: 'example@gmail.com',
  phoneNumber: '41999999999',
  birthday: '1989-11-30',
  ui: '35181130656406000198590005275280148495749148',
};

describe('/customer', () => {
  beforeEach(() => {
    Customer.destroy({ where: {}, force: true });
  });

  describe('/POST create a customer', () => {
    it('should create a new customer', (done) => {
      chai
        .request(app)
        .post('/customers')
        .send(payload)
        .then((res) => {
          expect(res).to.have.status(201);
          // eslint-disable-next-line no-unused-expressions
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('fullName');
          expect(res.body.fullName).to.be.eq('Fulano');
          expect(res.body).to.have.property('document');
          expect(res.body.document).to.be.eq('210.698.000-07');
          expect(res.body).to.have.property('email');
          expect(res.body.email).to.be.eq('example@gmail.com');
          expect(res.body).to.have.property('phoneNumber');
          expect(res.body.phoneNumber).to.be.eq(
            '41999999999',
          );
          expect(res.body).to.have.property('birthday');
          expect(res.body.birthday).to.be.eq(
            '1989-11-30T00:00:00.000Z',
          );
          expect(res.body).to.have.property('uid');
          expect(res.body.uid).to.be.eq(
            '35181130656406000198590005275280148495749148',
          );
          done();
        });
    });
  });
});
