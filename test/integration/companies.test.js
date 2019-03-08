/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */

const chai = require('chai');
const chainHttp = require('chai-http');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
const app = require('../../app');
const { Company } = require('../../models');

chai.use(chainHttp);

const company = {
  name: 'Company 1',
  document: '50.147.471/0001-03',
};

describe('/adm/companies', () => {
  beforeEach(() => {
    Company.destroy({ where: {}, force: true });
  });

  describe('/GET companies', () => {
    it('should GET all companies', (done) => {
      chai
        .request(app)
        .get('/adm/companies')
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

  describe('/POST companies', () => {
    it('should create a new companies', (done) => {
      chai
        .request(app)
        .post('/adm/companies')
        .send(company)
        .then((res) => {
          expect(res).to.have.status(201);
          // eslint-disable-next-line no-unused-expressions
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('name');
          expect(res.body.name).to.be.eq('Company 1');
          expect(res.body).to.have.property('document');
          expect(res.body.document).to.be.eq(
            '50.147.471/0001-03',
          );
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt');
          done();
        });
    });
  });

  describe('/GET/:id company', () => {
    it('should get a company', (done) => {
      Company.create(company).then((companySaved) => {
        chai
          .request(app)
          .get(`/adm/companies/${companySaved.id}`)
          .then((res) => {
            expect(res).to.have.status(200);
            // eslint-disable-next-line no-unused-expressions
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('name');
            expect(res.body.name).to.be.eq('Company 1');
            expect(res.body).to.have.property('document');
            expect(res.body.document).to.be.eq(
              '50.147.471/0001-03',
            );
            expect(res.body).to.have.property('createdAt');
            expect(res.body).to.have.property('updatedAt');
            done();
          });
      });
    });
  });

  describe('/PUT/:id company', () => {
    it('should create a new company', (done) => {
      Company.create(company).then((companySaved) => {
        chai
          .request(app)
          .put(`/adm/companies/${companySaved.id}`)
          .send({
            name: 'Company 2',
            document: '83.114.120/0001-47',
          })
          .then((res) => {
            expect(res).to.have.status(200);
            // eslint-disable-next-line no-unused-expressions
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('name');
            expect(res.body.name).to.be.eq('Company 2');
            expect(res.body).to.have.property('document');
            expect(res.body.document).to.be.eq('83.114.120/0001-47');
            expect(res.body).to.have.property('createdAt');
            expect(res.body).to.have.property('updatedAt');
            done();
          });
      });
    });
  });

  describe('/DELETE/:id company', () => {
    it('should delete a company', (done) => {
      Company.create(company).then((companySaved) => {
        chai
          .request(app)
          .delete(`/adm/companies/${companySaved.id}`)
          .then((res) => {
            expect(res).to.have.status(204);
            done();
          });
      });
    });
  });
});
