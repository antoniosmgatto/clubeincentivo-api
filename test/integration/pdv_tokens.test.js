/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */

const chai = require('chai');
const chainHttp = require('chai-http');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
const app = require('../../app');
const { Company, PdvToken } = require('../../models');

chai.use(chainHttp);

const company = {
  name: 'Company 1',
  document: '50.147.471/0001-03',
};

const pdvToken = {
  name: 'Token 1',
};

describe('/adm/companies/:company_id/pdv-tokens', () => {
  beforeEach(() => {
    PdvToken.destroy({ where: {}, force: true });
    Company.destroy({ where: {}, force: true });
  });

  describe('/GET pdv tokens', () => {
    it('should GET all company pdv tokens ', (done) => {
      Company.create(company).then((companySaved) => {
        chai
          .request(app)
          .get(`/adm/companies/${companySaved.id}/pdv-tokens`)
          .auth('admin', process.env.ADM_PASSWD)
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.header(
              'content-type',
              'application/json; charset=utf-8',
            );
            // eslint-disable-next-line no-unused-expressions
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.be.eq(0);
            done();
          });
      });
    });
  });

  describe('/POST create a pdv token', () => {
    it('should create a new pdv token', (done) => {
      Company.create(company).then((companySaved) => {
        chai
          .request(app)
          .post(`/adm/companies/${companySaved.id}/pdv-tokens`)
          .auth('admin', process.env.ADM_PASSWD)
          .send(pdvToken)
          .then((res) => {
            expect(res).to.have.status(201);
            // eslint-disable-next-line no-unused-expressions
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('name');
            expect(res.body.name).to.be.eq('Token 1');
            expect(res.body).to.have.property('token');
            // eslint-disable-next-line no-unused-expressions
            expect(res.body.token).to.not.be.null;
            expect(res.body).to.have.property('createdAt');
            done();
          });
      });
    });
  });

  describe('/DELETE/:id pdv token', () => {
    it('should delete a company pdv token', (done) => {
      Company.create(company).then((companySaved) => {
        PdvToken.create({
          ...pdvToken,
          ...{ companyId: companySaved.id },
        }).then((pdvTokenSaved) => {
          chai
            .request(app)
            .delete(
              `/adm/companies/${companySaved.id}/pdv-tokens/${
                pdvTokenSaved.id
              }`,
            )
            .auth('admin', process.env.ADM_PASSWD)
            .then((res) => {
              expect(res).to.have.status(204);
              done();
            });
        });
      });
    });
  });
});
